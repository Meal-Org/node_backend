const jwt = require('jsonwebtoken');

const {getAsync} = require('../initRedis');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '');
    if (!token) return res.status(401).send('Access Denied');

    try{
        //Check if the token is in the denylist
        const isBlacklisted = await getAsync(`blacklist_${token}`);
        if (!isBlacklisted) return res.status(401).send('Token has been logged out');

        //Verify token
        const verified = jwt.verify(token. process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (error) {
        res.status(400).send('Invalid Token')
    };
}
module.exports = verifyToken;