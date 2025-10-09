const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        res.status(401).json({ message: 'Unauthorized' });
    } else {
        next();
    }
};

module.exports = isAuthenticated;