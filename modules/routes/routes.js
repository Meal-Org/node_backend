const express = require('express');
const router = express.Router();
const register = require('../users/registration');
const login = require('../users/login');
const logout = require('../users/logout');
const verifyToken = require('../../middleware/verifyToken');

console.log(register, login, logout, verifyToken);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/protected', verifyToken, (req, res) => {
    res.send('Protected route accessed');
});

module.exports = router;
