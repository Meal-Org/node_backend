const express = require('express');
const router = express.Router();
const register = require('../services/auth/registration');
const login = require('../services/auth/login');
const logout = require('../services/auth/logout');
const verifyToken = require('../middleware/verifyToken');

console.log(register, login, logout, verifyToken);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/protected', verifyToken, (req, res) => {
    res.send('Protected route accessed');
});

module.exports = router;
