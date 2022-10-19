import express from 'express';
import { addGrade, allUniversities, fetchUniversityInfo } from '../controllers/university.js';

const router = express.Router();

router.post('/add-grade', (req, res) => {
    addGrade(req, res)
});

router.get('/fetch/:universityname', (req, res) => {
    fetchUniversityInfo(req, res)
});

router.get('/all', (req, res) => {
    allUniversities(req, res)
});

export default router;