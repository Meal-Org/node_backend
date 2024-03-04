const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { loginValidation } = require('./validation');

const prisma = new PrismaClient();

const login = async (req, res) => {
    try {
        // Validate data before login
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Check if the email exists
        const user = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (!user) return res.status(400).json({ error: 'Email or password is incorrect' });

        // Checking if password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ error: 'Password is incorrect' });

        // Create and assign a token
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        // Set the auth-token in the response header and send the token in the response body
        res.header('auth-token', token).json({ token: token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = login;
