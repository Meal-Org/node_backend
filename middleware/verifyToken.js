const jwt = require('jsonwebtoken');
const { getAsync } = require('../initRedis'); // Ensure this path is correct for your project structure

const verifyToken = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    // Ensure the token is formatted properly as a Bearer token
    if (token.startsWith('Bearer ')) {
        // Remove "Bearer " to get the actual token
        token = token.slice(7, token.length).trim();
    } else {
        return res.status(401).send('Access Denied. Token not formatted correctly.');
    }

    try {
        // Check if the token is in the denylist
        const isBlacklisted = await getAsync(`blacklist_${token}`);
        if (isBlacklisted) return res.status(401).send('Token has been blacklisted');

        // Verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = verifyToken;
