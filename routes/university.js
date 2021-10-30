import express from 'express';
import { register, getUniversities } from '../controllers/university';
const router = express.Router();

router.post('/register', register);
router.get('/universities', getUniversities);

module.exports = router;
