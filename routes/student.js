const express = require("express");
const router = express.Router();

router.post('/authorize', (req, res) => {
    res.send('Authorize');
});

router.get('/fetch', (req, res) => {
    res.send('Fetch');
});

router.get('/requests', (req, res) => {
    res.send('Fetch all requests');
});

router.post('/accept', (req, res) => {
    res.send('Accept request');
});

router.post('/decline', (req, res) => {
    res.send('Decline request');
});

router.post('/delete', (req, res) => {
    res.send('Delete access given');
});

export default router;