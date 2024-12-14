const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// A protected route that requires a valid JWT token
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).send('This is a protected route');
});

module.exports = router;
