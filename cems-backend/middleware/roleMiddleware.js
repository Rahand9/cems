const roleCheck = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
  }
  next();
};

module.exports = roleCheck;