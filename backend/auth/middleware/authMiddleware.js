import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const optionalAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.user = user;
        });
    }
    next(); // Continue even if no token is provided
};

export const authorizeRole = (req, res, next) => {
    if (['Seller', 'Admin'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
}