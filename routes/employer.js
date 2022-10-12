const express = require("express");
const router = express.Router();

router.get('/fetch', (req, res) => {
    res.send('Fetch');
});

router.get('/transcript/:cpr', (req, res) => {
    res.send('Fetch transcript');
});

router.post('/request-access', (req, res) => {
    res.send('Request access to transcript');
});

export default router;