const express = require("express");
const router = express.Router();

router.post('/authorize', (req, res) => {
    res.send('Authorize');
});

router.get('/fetch', (req, res) => {
    res.send('Fetch');
});

router.get('/transcript/:cpr', (req, res) => {
    res.send('Fetch transcript');
});

router.post('/request-access', (req, res) => {
    res.send('Request access to transcript');
});

module.exports = router;