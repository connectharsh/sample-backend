const express = require('express');
const router = express.Router();
const User = require('../dataModels/UserModel');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const key = "harshIsAGoodBoy@9058";

router.post('/',
    body('password').isLength({ min: 5 }),
    body('number').isLength({ min: 10 }),

    async (req, res) => {

        try {

            //checking if there are any errors in user input 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //no errors found in userinput
            else {
                const { number, password } = req.body;
                const user = await User.findOne({ 'number': number });
                if (user) {
                    const verifiedPassword = await bcrypt.compare(password, user.password);
                    if (verifiedPassword) {
                        const data = {
                            id: user.id
                        }
                        const webToken = jwt.sign(data, key);
                        res.json(webToken);
                    }
                    else {
                        res.json({ 'message': "sorry passwords arenot matched" });
                    }
                }
                else {
                    res.json({ 'message': "please signup no user exists with this number" })
                }
            }
        } catch (error) {
            res.json({ "message": "internal server error" })
        }
    });

module.exports = router;
