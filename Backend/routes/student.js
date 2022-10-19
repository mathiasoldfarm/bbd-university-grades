import express from 'express';
import {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deletePermission,
    allStudents,
    fetchPermissions
} from '../controllers/student.js';
const router = express.Router();

router.get('/fetch/:cpr', (req, res) => {
    fetchStudentInfo(req, res)
});

router.get('/all', (req, res) => {
    allStudents(req, res)
});

router.get('/requests/:cpr', (req, res) => {
    fetchRequests(req, res)
});

router.get('/permissions/:cpr', (req, res) => {
    fetchPermissions(req, res)
});

router.post('/accept', (req, res) => {
    acceptRequest(req, res)
});

router.post('/decline', (req, res) => {
    declineRequest(req, res)
});

router.delete('/delete-permission/:cpr/:companyname', (req, res) => {
    deletePermission(req, res)
});

export default router;