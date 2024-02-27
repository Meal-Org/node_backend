const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { registerValidation } = require('./validation');

const prisma = new PrismaClient();

const register = async (req, res) => {
    //Validate data before creating a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user is already in the DB
    const emailExist = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    try {
        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            },
        });
        res.send({ user: user.id });
    } catch (err) {
        res.status(400).send(err)
    }

};

module.exports = register;