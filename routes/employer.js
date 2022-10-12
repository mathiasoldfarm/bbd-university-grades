import express from 'express';
import {
    fetchEmployerInfo,
    fetchTranscriptByCpr,
    requestAccessByCpr
} from '../controllers/employer';

const router = express.Router();

router.get('/fetch', (req, res) => {
    fetchEmployerInfo(req, res)
});

router.get('/transcript/:cpr', (req, res) => {
    fetchTranscriptByCpr(req, res, req.params.cpr)
});

router.post('/request-access/:cpr', (req, res) => {
    requestAccessByCpr(req, res, req.params.cpr)
});

export default router;