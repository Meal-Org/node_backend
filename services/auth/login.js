const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const {loginValidation} = require('./validation');

const prisma = new PrismaClient();

const login = async(req, res) => {
    //validate data before login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the email exists
    const user = await prisma.user.findUnique({where: {email: req.body.email} });
    if (!user) return res.status(400).send('Email or password is incorrect');

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is incorrect');

    //Create and assign a token
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET,{expiresIn: '1h'});
    req.header('auth-token', token).send(token);
};
module.exports = login;

