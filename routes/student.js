import express from 'express';
import {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deleteRequest
} from '../controllers/student';
const router = express.Router();

router.get('/fetch', (req, res) => {
    fetchStudentInfo(req, res)
});

router.get('/requests', (req, res) => {
    fetchRequests(req, res)
});

router.post('/accept', (req, res) => {
    acceptRequest(req, res)
});

router.post('/declinet', (req, res) => {
    declineRequest(req, res)
});

router.post('/delete', (req, res) => {
    deleteRequest(req, res)
});

export default router;