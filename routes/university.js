import express from 'express';
import { register, getUniversities, getSingle } from '../controllers/university';
const router = express.Router();

router.post('/register', register);
router.get('/', getUniversities);
router.get('/edit/:_id', getSingle);

module.exports = router;
