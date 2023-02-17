const express = require('express');
const router = express.Router();
const User = require('../dataModels/UserModel');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const key = "harshIsAGoodBoy@9058";
const bcrypt = require('bcryptjs')

router.post('/',

    body('password').isLength({ min: 5 }),
    body('number').isLength({ min: 10 }),
    body('username').isLength({ min: 5 }),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            //checking if there are any errors
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //errors not found 
            else {

                //checking if any user with this number already exists or not 
                foundUser = await User.findOne({ 'number': req.body.number });

                //existing user found 
                if (foundUser) {
                    res.json({ 'message': 'user already exists' });
                }

                //existing user not found creating the new user 
                else {

                    //hashing the password before storing it in our database.
                    let password = req.body.password;
                    const salt = await bcrypt.genSalt(10);
                    hashedPassword = await bcrypt.hash(password, salt);


                    //storiong user  into our database 
                    const user = await User.create({
                        username: req.body.username,
                        number: req.body.number,
                        password: hashedPassword
                    });


                    //creating data to convert it into  jwt   
                    const data = {
                        id: user.id,
                    }

                    //signing the webtoken with our secret key 
                    const webToken = jwt.sign(data, key)
                    res.json(webToken);
                }
            }

        }
        catch (err) {
            res.json({ "message": "internal server error" })
        }

    }
);

//final module export     
module.exports = router;
