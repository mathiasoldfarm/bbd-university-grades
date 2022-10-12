const express = require("express");
const router = express.Router();

router.post('/add-grade', (req, res) => {
    res.send('Add grade');
});

export default router;