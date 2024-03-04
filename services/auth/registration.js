const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { registerValidation } = require('./validation');

const prisma = new PrismaClient();

const register = async (req, res) => {
    console.log('Register endpoint hit with request body:', req.body);

    // Validate data before creating a user
    const { error } = registerValidation(req.body);
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user is already in the DB
    try {
        const emailExist = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (emailExist) {
            console.log('Email already exists in the database:', req.body.email);
            return res.status(400).send('Email already exists');
        }
    } catch (dbError) {
        console.error('Error checking user email existence:', dbError);
        return res.status(500).send('Error checking email existence');
    }

    // Hash Password
    let hashedPassword;
    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
    } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).send('Error creating user');
    }

    // Create a new user
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

        // Prepare the response object without the password for security reasons
        const responseUser = {
            email: user.email,
            username: user.username,
        };

        res.send({ user: responseUser });
        console.log('User created successfully:', user);
        res.send({ user: user.id });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).send(err.message);
    }
};

module.exports = register;
