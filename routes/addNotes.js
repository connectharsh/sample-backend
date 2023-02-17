const express = require('express');
const router = express.Router();
const Note = require('../dataModels/NoteModel');
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


router.post('/',
    fetchUser,

    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 10 }),

    async (req, res) => {

        const errors = validationResult(req);

        //checking if there are any errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { title, description, tags } = req.body;
            const note = await Note.create({
                user: req.id.toString(),
                title: title,
                description: description,
                tags: tags
            });
            res.json({ "message": "notes added successfully" });
        }

    });

module.exports = router;
