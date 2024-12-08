const checkRole = (...accessRoles) => {
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles
    const isAccess = accessRoles.includes(req.user?.role);
    if (!isAccess) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = checkRole;
