import React, { useState, useEffect, useRef } from 'react';
import './DocBuilder.css';
import { fetchState, saveState } from '../../Api/api.js'
import html2pdf from 'html2pdf.js';
import PdfViewer from './PdfViewer.jsx';
import Question from './Question.jsx';
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}
function DocBuilder() {
  const Date = getDate();
  const content = [
    `<p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <b>{answer} </b>its subsidiaries, associates and affiliated
      companies are committed to process your personal data as per the laws
      of your jurisdiction and everything we do has privacy built into the
      design.  Our collection of your data when you use our website or
      products are no different. We only collect your information where
      there is a good reason to do so and we will handle it in a legally
      compliant and ethical manner at all times. You have our word!
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      We hereby notify you the following information about your personal
      data processing. If there is anything not clear, please reach out to
      us and we’re always happy to discuss further.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>What information do we collect?</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      We might collect personal data about you either when you use our
      website or products, receive any services from us, contact us, attend
      any events (virtually or in-person), or otherwise interact with us
      online or in-person.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">
      <br/>
      <br/>
     
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">
     
     
      </p>
      <p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;">     The
      information we may collect includes :</p>
      <ol style="margin-left:2cm; margin-right:2cm;">
        <li><p align="justify" style="margin-bottom: 0in">Personally
        identifiable information, such as your
        </p></li>
      </ol>
      <ul style="margin-left:2cm; margin-right:2cm;">`,  //1
    `<li><p align="justify" style="margin-bottom: 0in"><b>Name,</b></p>`,  //2
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The purpose of
          collecting the name of the user: {answer}</b>
          </p></li>
        </ul>`,  //3
    `<li><p align="justify" style="margin-bottom: 0in"><b>Shipping Address,</b>
        </p>`,
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The
          purpose of collecting the shipping address of the user is: {answer}</b></p></li>
        </ul>`,
    `<li><p align="justify" style="margin-bottom: 0in"><b>E-mail Address,</b>
        </p>`,  //6
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The
          purpose of collecting the e-mail address of the user is: {answer}</b></p></li>
        </ul>`,  //7
    `<li><p align="justify" style="margin-bottom: 0in"><b>Mobile Number,</b></p>`, //8
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The
          purpose of collecting the mobile number of the user is: {answer}</b></p></li>
        </ul>`, //9
    `<li><p align="justify" style="margin-bottom: 0in"><b>Camera,</b></p>`,  //10
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The purpose of
          accessing the camera of the user is: {answer}</b></p></li>
        </ul>
      </ul>`,
    `</ul>
      <div style="break-after:page"></div>
      <ol start="2" style=" margin-left:2cm; margin-right:2cm; margin-top:2cm">
        <li><p align="justify" style="margin-bottom: 0in">Demographic
        information, such as your
        </p></li>
      </ol>
      <ul style="margin-left:2cm; margin-right:2cm;">`,  //11
    `<li><p align="justify" style="margin-bottom: 0in"><b>Age,</b>
        </p>`,  //12
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The purpose of
          collecting the age of the user is: {answer}</b></p></li>
        </ul>`,  //13
    `<li><p align="justify" style="margin-bottom: 0in"><b>Gender,</b>  
        </p>`,  //14
    `<ul>
          <li><p align="justify" style="margin-bottom: 0in"><b>The purpose of
          collecting the gender of the user is: {answer}</b></p></li>
        </ul>`, //15
    `<li><p align="justify" style="margin-bottom: 0.14in">Interests, that
        you voluntarily give to us [when you register with the Site [or our
        mobile application], or when you choose to participate in various
        activities related to the Site [and our mobile application], such as
        online chat and message boards or when you expressly grant us access
        or permission.
        </p></li>
      </ul>
      <p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;">You are under no
      obligation to provide us with personal information of any kind,
      however your refusal to do so may prevent you from using certain
      features of the Site [and our mobile application]. Device
      information, such as your mobile device ID, model, and manufacturer,
      and information about the location of your device, if you access the
      Site from a mobile device.</p>
      <p style="margin-bottom: 0in;margin-left:2cm; margin-right:2cm;"><u><b>Disclosure of Your Information</b></u></p>
      <p style="margin-bottom: 0in">
      </p>
      <p style="margin-bottom: 0in; margin-left:2cm; margin-right:2cm;"><font face="Roboto, serif">Well…
      you should know that we don’t share personal data unless either
      you’ve told us we can, it is to provide you with our
      products/services, we have a legal duty or reason to do so, or the
      law requires that we do.</font></p>
      <p style="margin-bottom: 0in; margin-left:2cm; margin-right:2cm;"><font face="Roboto, serif">We
      may need though to share with some third parties, including:</font></p>
      <ol style="margin-left:2cm; margin-right:2cm;">
        <li><p style="margin-bottom: 0in"><font face="Arial, serif">By Law
        or to Protect Rights</font></p></li>
        <li><p style="margin-bottom: 0in"><font face="Arial, serif">Third-Party
        Service Providers and affiliates</font></p></li>
        <li><p style="margin-bottom: 0in"><font face="Arial, serif">Marketing
        Communications</font></p></li>
        <li><p style="margin-bottom: 0in"><font face="Arial, serif">Business
        Partners</font></p></li>
      </ol>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">
      <br/>
      <br/>
     
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Sensitive Data</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Sensitive data refers to special categories of personal data. These
      ‘special categories’ are things like health information, ethnic
      origin, political views and other information which are more
      sensitive than usual.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Whenever we need to collect this we will ask you first, and make sure
      you know why we need this from you.</p>
      <p align="justify" style="margin-bottom: 0.14in"><br/>
      <br/>
     
      </p>
      <div style="break-after:page"></div>
      <br><br><br><br>
      <p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;"><b>Automated Decision Making</b></p>
      <p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;">“Automated
      decision making” is essentially where a technology (e.g. AI or a
      smart algorithm) can make a decision about something without human
      intervention.
      </p>`,  //16
    `<p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;"><b>We do
      not use automated decision-making process during our relationship
      with you.</b>
      </p>`,  //17
    `<p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;"><b>We use
      automated decision making process in case of:</b>
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <ul style="margin-left:2cm; margin-right:3cm;"><li><b> {answer}</b></li></ul>
      </p>
      `,  //18
    `<p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">
      <br>
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Where we store your data?</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in;margin-left:2cm; margin-right:2cm;">
      The data that we collect from you may be transferred to, and stored
      at, a destination<br/>
      outside of the country where you may be
      located. Depending upon the personal data we<br/>
      collect, it may be
      processed by our team operating in another country or by one of our
      suppliers or business partners.
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      By submitting your personal data, you agree to this transfer, storing
      and/or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in
      accordance with this privacy notice.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in;margin-left:2cm; margin-right:2cm;">
      <u><b>Security!</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      We have robust internal policies and standards to keep information
      secure. Once we have received your information, we will use strict
      controls, procedures and leading security features to try to prevent
      unauthorised access.
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Whilst we cannot 100% guarantee the security of the data transmitted
      to our site; we will always do our best to protect your personal
      data.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>What about third parties referred on our platforms?</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Our platforms may, from time to time, contain links to and from the
      websites of our member and associate member organisations,
      advertisers and affiliates. If you follow a link to any of these
      websites, please note that these websites have their own privacy
      policies and that we do not accept any responsibility or liability
      for these policies. Please check these policies before you submit any
      personal data to these websites.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Sharing aggregate and anonymised data</b></u></p>`,  //19
    `<p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Where we have made your information anonymous (this means no one can
      ever know it was you or link it back to you), we may share it outside
      of {answer} with partners such as
      research groups, universities, advertisers or connected sites. </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>How long we keep your information</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in;margin-left:2cm; margin-right:2cm;">
      We will retain your personal data for as long as you use our services
      and for a reasonable<br/>
      time thereafter. We have a data retention
      policy which includes more specific details<br/>
      and we’d be
      happy to share this with you at any time (just ask).</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <div style="break-after:page"></div>
      <br><br><br><br>
      <u style="margin-left:2cm; margin-right:2cm;"><b>Sale of personal data</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">   
      </p>`,  //20
    `<p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;">We do not sell, rent,
      release, disclose, disseminate, make available, transfer, or
      otherwise communicate orally, in writing, or by electronic or other
      means, your Personal Data to a third party for valuable
      consideration.
      </p>`,  //21
    `<p align="justify" style="margin-bottom: 0.14in; margin-left:2cm; margin-right:2cm;">We may sell, rent,
      release, disclose, disseminate, make available, transfer, or
      otherwise communicate orally, in writing, or by electronic or other
      means, yourPersonal Data to a third party for valuable
      consideration.Your consent to this Policy followed by submission of
      your Personal Data represents your agreement to this clause.
      </p>`,  //22
    `<p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <br/>
      <br/>
     
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Children's Privacy</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      If you are a parent or guardian and you are aware that your child has
      provided us with Personal Data, please contact us. If we become aware
      that we have collected Personal Data from anyone under the age of 18
      without verification of parental consent, we shall take steps to
      remove that information from our servers.</p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Your data, Your rights</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      You’ve got rights under law when it comes to your data. It is your
      data after all! These<br/>
      rights can vary from country to country
      and you’re always welcome to ask us. These may<br/>
      include the
      following:</p>
      <ul style="margin-left:2cm; margin-right:2cm;">
        <li><p align="justify" style="margin-bottom: 0in; border: none; padding: 0in">
        <u><b>Access</b></u>: You have the right to access information held
        about you.</p></li>
        <li><p align="justify" style="margin-bottom: 0in; border: none; padding: 0in">
         <u><b>Object</b></u>: You may object to our use of your personal
        data for any purposes which<br/>
      is based upon our legitimate
        interest as its legal basis.</p></li>
        <li><p align="justify" style="margin-bottom: 0in; border: none; padding: 0in">
        <u><b>Withdraw</b></u>: You may withdraw your consent to any
        processing of your personal<br/>
      data at any time.</p></li>
        <li><p align="justify" style="margin-bottom: 0in; border: none; padding: 0in">
        <u><b>Rectify</b></u>: You have the right to rectify any personal
        data held about you that is<br/>
      inaccurate.</p></li>
        <li><p align="justify" style="margin-bottom: 0in; border: none; padding: 0in">
        <u><b>Erase:</b></u> You may (but not always) have the right to
        request the erasure of your<br/>
      personal data we hold.</p></li>
        <li><p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">
        <u><b>Complaint:</b></u> In the event that you wish to make a
        complaint about how we<br/>
      process your personal data, please
        contact us in the first instance and we will<br/>
      endeavour to deal
        with your request as soon as possible.
        </p></li>
      </ul>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <br><br>
      <u><b>What about changes to this policy?</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in">   
      </p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      This privacy notice was last updated on <b>${Date}</b></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      <u><b>Whom to contact in case of grievance?</b></u></p>
      <p align="justify" style="margin-bottom: 0.14in; border: none; padding: 0in; margin-left:2cm; margin-right:2cm;">
      Questions, comments and requests regarding this privacy notice are
      welcomed and should be addressed to <b>{answer}</b>
      </p>
      `  //23
  ];
  const [displayedContent, setDisplayedContent] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const pdfRef = useRef();
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const state = await fetchState();
        setDisplayedContent(state.displayedContent || []);
        setAnswers(state.answers || {});
        setCurrentQuestion(state.questionNumber || 0);
      } catch (error) {
        console.error('Failed to load initial state:', error);
      }
    };
    loadInitialState();
  }, []);


  const handleAnswer = (qnum, answer) => {
    const newAnswers = { ...answers, [qnum]: answer };
    setAnswers(newAnswers);
    let companyName = answers[0];
    const updatedContent = [...displayedContent];


    switch (qnum) {
      case 1:
        updatedContent.push(content[0].replace('{answer}', answer));
        break;
      case 2:
        if (answer === 'Yes') {
          updatedContent.push(content[1]);
        } else {
          setCurrentQuestion(qnum + 1);
        }
        break;
      case 3:
        updatedContent.push(content[2].replace('{answer}', answer));
        break;
      case 4:
        if (answer === 'Yes') {
          updatedContent.push(content[3]);
        } else {
          setCurrentQuestion(qnum + 1);
        }
        break;
      case 5:
        updatedContent.push(content[4].replace('{answer}', answer));
        break;
      case 6:
        if (answer === 'Yes') {
          updatedContent.push(content[5]);
        } else {
          setCurrentQuestion(qnum + 1);
        }
        break;
      case 7:
        updatedContent.push(content[6].replace('{answer}', answer));
        break;
      case 8:
        if (answer === 'Yes') {
          updatedContent.push(content[7]);
        } else {
          setCurrentQuestion(qnum + 1);
        }
        break;
      case 9:
        updatedContent.push(content[8].replace('{answer}', answer));
        break;
      case 10:
        if (answer === 'Yes') {
          updatedContent.push(content[9]);
        } else {
          setCurrentQuestion(qnum + 1);
          updatedContent.push(content[11]);
        }
        break;
      case 11:
        updatedContent.push(content[10].replace('{answer}', answer));
        updatedContent.push(content[11]);
        break;
      case 12:
        if (answer === 'Yes') {
          updatedContent.push(content[12]);
        } else {
          setCurrentQuestion(qnum + 1);
        }
        break;
      case 13:
        updatedContent.push(content[13].replace('{answer}', answer));
        break;
      case 14:
        if (answer === 'Yes') {
          updatedContent.push(content[14]);
        } else {
          setCurrentQuestion(qnum + 1);
          updatedContent.push(content[16]);
        }
        break;
      case 15:
        updatedContent.push(content[15].replace('{answer}', answer));
        updatedContent.push(content[16]);
        break;
      case 16:
        if (answer === 'No') {
          updatedContent.push(content[17]);
          updatedContent.push(content[19]);
          updatedContent.push(content[20].replace('{answer}', companyName));
          setCurrentQuestion(18);
        }
        break;
      case 17:
        updatedContent.push(content[18].replace('{answer}', answer));
        updatedContent.push(content[19]);
        updatedContent.push(content[20].replace('{answer}', companyName));
        break;
      case 18:
        if (answer === 'No') {
          updatedContent.push(content[21]);
        } else {
          updatedContent.push(content[22]);
        }
        break;
      case 19:
        updatedContent.push(content[23].replace('{answer}', answer));
        break;
      default:
        break;
    }


    setDisplayedContent(updatedContent);
    saveState({ questionNumber: currentQuestion + 1, displayedContent: updatedContent, answers: newAnswers });
    setCurrentQuestion(qnum);
  };
  const generatePDF = () => {
    const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
            </style>
          </head>
          <body>
            ${displayedContent.join('')}
          </body>
        </html>
      `;
    const element = document.createElement('div');
    element.innerHTML = htmlContent;


    html2pdf()
      .set({
        margin: 1,
        filename: `Privacy_Policy_${getDate().replace(/\//g, '-')}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };


  return (
    <div className="App" style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div id="chat-container">
        <Question
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
      <div id="pdf-container">
        {currentQuestion === 19 && (
          <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer', marginLeft: '30px' }}>
            Download PDF
          </button>
        )}
        <div ref={pdfRef} className="pdf">
          <PdfViewer displayedContent={displayedContent} />
        </div>
      </div>
    </div>
  );
}

export default DocBuilder