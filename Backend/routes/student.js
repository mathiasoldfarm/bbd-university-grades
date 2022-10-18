import express from 'express';
import {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deletePermission,
    allStudents
} from '../controllers/student.js';
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

router.delete('/delete-permission', (req, res) => {
    deletePermission(req, res)
});

router.get('/all', (req, res) => {
    allStudents(req, res)
});

export default router;