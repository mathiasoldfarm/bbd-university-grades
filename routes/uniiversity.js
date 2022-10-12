const express = require("express");
const router = express.Router();

router.post('/authorize', (req, res) => {
    res.send('Authorize');
});

router.post('/add-grade', (req, res) => {
    res.send('Add grade');
});

module.exports = router;