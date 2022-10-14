import express from 'express';
import {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deletePermission
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

router.post('/delete-permission', (req, res) => {
    deletePermission(req, res)
});

export default router;