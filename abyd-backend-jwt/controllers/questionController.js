import { questionsMap } from '../questionsData.js'
import User from '../models/User.js';

export async function getQuestionData(req, res) {
  let { questionNo } = req.body;
  questionNo = parseInt(questionNo)

  if (!questionsMap.size) {
    await loadQuestionsData();
  }

  if (questionsMap.has(questionNo)) {
    res.json(questionsMap.get(questionNo));
  } else {
    res.status(404).json({ message: "Question not found" });
  }
}

export async function getNextQuestion(req, res) {
  const { email, currentQuestionNo, selectedKeywords } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user model with the selected keywords for the current question
    const questionKeywords = user.questionKeywords.find(q => q.questionNo === currentQuestionNo);
    if (questionKeywords) {
      questionKeywords.keywords = [...new Set([...questionKeywords.keywords, ...selectedKeywords])];
    } else {
      user.questionKeywords.push({ questionNo: currentQuestionNo, keywords: selectedKeywords });
    }

    const currentQuestion = questionsMap.get(parseInt(currentQuestionNo));

    if (!currentQuestion) {
      return res.status(404).json({ message: 'Current question not found' });
    }

    // Update userStats based on current question data
    // Update compliance checklist based on selected keywords
    if (currentQuestion.complianceChecklist) {

      let item = currentQuestion.complianceChecklist;
      let parts = item.slice(1, -1).split(", ");

      const keywordNo = parts[0];
      const complianceItem = parts[1];

      if (selectedKeywords.includes(keywordNo.toString())) {
        user?.userStats?.get('complianceChecklist')?.push([complianceItem, false]);
      }

    }

    if (currentQuestion.stepByStepGuide) {
      user.userStats.get('stepByStepGuide').push(
        currentQuestion.stepByStepGuide.map(step => [step, false])
      );
    }

    // Update certifications with checked field as array of arrays of arrays
    if (currentQuestion.certifications) {
      user.userStats.get('certifications').push(
        currentQuestion.certifications.map(cert => [cert, false]) // Push array of arrays [name, checked]
      );
    }

    if (currentQuestion.penaltyKeywords) {
      user.userStats.get('penaltyKeywords').push(currentQuestion.penaltyKeywords);
    }

    if (currentQuestion.faqs) {
      user.userStats.get('faqs').push(currentQuestion.faqs);
    }

    if (currentQuestion.doDont) {
      user.userStats.get('doDont').push(currentQuestion.doDont);
    }

    if (currentQuestion.legalDocuments) {
      user.userStats.get('legalDocuments').push(currentQuestion.legalDocuments);
    }

    await user.save();

    // Now, we need to check for the next question based on the criteria
    let nextQuestionNo = parseInt(currentQuestionNo) + 1;
    let criteriaMatched = false;

    while (!criteriaMatched) {
      const nextQuestion = questionsMap.get(nextQuestionNo);

      if (!nextQuestion) {
        return res.status(404).json({ message: 'No more questions available' });
      }

      // Check if there are criteria for this next question
      const criteria = nextQuestion.criteria;
      if (criteria && criteria.length > 0) {
        let allCriteriaFulfilled = true;

        for (let crit of criteria) {
          const { qNo, kNo } = crit;

          // Check if the user has selected the required keyword for this criteria
          const userQuestionKeywords = user.questionKeywords.find(q => q.questionNo === qNo);
          if (!userQuestionKeywords || !userQuestionKeywords.keywords.includes(kNo.toString())) {
            allCriteriaFulfilled = false;
            break;
          }
        }

        if (allCriteriaFulfilled) {
          criteriaMatched = true;
        } else {
          nextQuestionNo++; // Move to the next question if the criteria is not fulfilled
        }
      } else {
        // If no criteria is set for the question, we can send the question immediately
        criteriaMatched = true;
      }
    }

    const nextQuestion = questionsMap.get(nextQuestionNo);

    res.json(nextQuestion);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Function to calculate compliance percentage based on the email
export const calculateCompliance = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalPenaltyKeywords = 16;

    const penaltyKeywordsSelected = user.userStats?.get('penaltyKeywords').length || 0;

    const compliancePercentage = ((totalPenaltyKeywords - penaltyKeywordsSelected) / totalPenaltyKeywords) * 100;

    res.status(200).json({ compliancePercentage: compliancePercentage.toFixed(2) });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComplianceChecklist = async (req, res) => {
  const { email, complianceChecklist } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.userStats.complianceChecklist = complianceChecklist;

    await user.save();

    res.status(200).json({ msg: 'Compliance checklist updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateCertifications = async (req, res) => {
  const { email, certifications } = req.body;

  if (!email || !Array.isArray(certifications)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.userStats.certifications = certifications;

    await user.save();

    res.status(200).json({ message: 'Certifications updated successfully' });
  } catch (error) {
    console.error('Error updating certifications:', error);
    res.status(500).json({ message: 'Server error, unable to update certifications' });
  }
};

// export const updateCertificationStatus = async (req, res) => {
//   const { email, certificationName, isChecked } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const certifications = user.userStats.certifications;

//     const certificationIndex = certifications.findIndex(cert => cert[0][0] === certificationName);

//     if (certificationIndex === -1) {
//       return res.status(404).json({ message: 'Certification not found' });
//     }

//     certifications[certificationIndex][0][1] = isChecked;

//     await user.save();

//     return res.status(200).json({ message: 'Certification status updated successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };