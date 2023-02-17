const express = require('express');
const router = express.Router();
const Note = require('../dataModels/NoteModel');
const fetchUser = require('../middleware/fetchuser');

router.put('/:id', fetchUser,
    async (req, res) => {
        const postId = req.params.id;
        try {

            //checking if the postid is provided or not 
            if (postId) {

                //getting data of post by post id 
                let postToBeUpdated = await Note.findById(postId);

                //if data found succesfully without any errors
                if (postToBeUpdated) {

                    //checking if the post user is the same user who wanna update it 
                    if (postToBeUpdated.user.toString() === req.id.toString()) {

                        //storing the new note from req.body
                        let newNote = {};
                        const { title, description, tag } = req.body;


                        //addding the notes componenet one by one if exits 
                        if (title) {
                            newNote.title = title;
                        }
                        if (description) {
                            newNote.description = description;
                        }
                        if (tag) {
                            newNote.tag = tag
                        }

                        //finally storing it in our database 
                        newNote = await Note.findByIdAndUpdate(postId, { $set: newNote }, { new: true });
                        res.json({ "message": "note updated successfully" });
                    } else {
                        res.json({ 'message': 'you are not authorized' })
                    }
                }
                else {
                    //wrong id provided by user 
                    res.json({ 'message': 'invalid id' });
                }
            }
            else {
                res.json({ 'message': 'invalid id' });
            }
        } catch (error) {
            res.json({ 'message': 'invalid id' })
        }
    });

module.exports = router;
