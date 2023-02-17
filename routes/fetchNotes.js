const express = require('express');
const router = express.Router();
const Note = require('../dataModels/NoteModel');
const fetchUser = require('../middleware/fetchuser');
router.get('/',
    fetchUser,
    async (req, res) => {
        console.log(req.id)
        const notes = await Note.find({'user':req.id})
        console.log(notes);
        res.json(notes);
    });

module.exports = router;
