import express from 'express';
import { addGrade } from '../controllers/university';

const router = express.Router();

router.post('/add-grade', (req, res) => {
    addGrade(req, res)
});

export default router;