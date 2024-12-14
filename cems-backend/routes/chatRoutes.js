const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware'); // For protected routes

// Example: Protected route for chat history (future implementation)
router.get('/history', authenticateJWT, (req, res) => {
    res.status(200).send('Chat history route (not implemented yet).');
});

module.exports = router;
