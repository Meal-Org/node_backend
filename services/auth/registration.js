const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { registerValidation } = require('./validation');

const prisma = new PrismaClient();

const register = async (req, res) => {

    try {
        const {error} = registerValidation(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        // Check if the user is already in the DB

        const emailExist = await prisma.user.findUnique({where: {email: req.body.email}});
        if (emailExist) {
            return res.status(400).json('Email already exists');
        }


    // Hash Password
         let hashedPassword;
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create a new user
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

        // res.send({user: responseUser});
        // res.send({user: user.id});

        return res.json({user: {...responseUser, user_id: user.id},})


    }catch (dbError) {
        console.error('Error checking user email existence:', dbError);
        return res.status(500).send('Error checking email existence');
    }
};

module.exports = register;
