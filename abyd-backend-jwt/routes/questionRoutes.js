import express from 'express';
import { getQuestionData, getNextQuestion, calculateCompliance, updateComplianceChecklist, updateCertifications } from '../controllers/questionController.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/get-questions-data', getQuestionData);
router.post('/get-next-question', getNextQuestion);
router.post('/calculate-compliance-percentage', calculateCompliance);
router.put('/update-compliance-checklist', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('complianceChecklist').isArray().withMessage('Compliance checklist must be an array')
], updateComplianceChecklist);
router.post('/update-certifications', updateCertifications);

export default router;
