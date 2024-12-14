const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).send('Access denied');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid or expired token');
        }

        req.user = user;  // Attach user information to request
        next();  // Proceed to next middleware or route
    });
};

module.exports = authenticateJWT;