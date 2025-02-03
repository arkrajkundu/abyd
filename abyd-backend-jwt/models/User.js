import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String },
  industry: { type: String },
  subIndustry: { type: String },

  questionKeywords: [{
    questionNo: { type: Number, default: 0 },
    keywords: { type: [String], default: [] }
  }],

  userStats: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {
      "complianceChecklist": [[String, Boolean]],
      "penaltyKeywords": [],
      "stepByStepGuide": [[[String, Boolean]]],
      "faqs": [],
      "onTheRightSide": [],
      "doDont": [],
      "certifications": [[[String, Boolean]]],
      "legalDocuments": []
    }
  }

}, { timestamps: true });

export default mongoose.model('User', User);
