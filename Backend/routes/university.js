import express from 'express';
import { addGrade, allUniversities } from '../controllers/university';

const router = express.Router();

router.post('/add-grade', (req, res) => {
    addGrade(req, res)
});

router.get('/all', (req, res) => {
    allUniversities(req, res)
});

export default router;