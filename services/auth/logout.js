const jwt = require('jsonwebtoken');

const logout = async (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied');

    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        // Get expiration from the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const expires = decoded.exp - Math.floor(Date.now() / 1000);

        // Add token to Redis with an expiration
        await setAsync(`blacklist_${token}`, 'logged out', 'EX', expires);

        res.send({ message: "Logged out successfully" });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

module.exports = logout;