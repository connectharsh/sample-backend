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
                let postToBeDeleted = await Note.findById(postId);
                console.log(postToBeDeleted);


                //if data found succesfully without any errors
                if (postToBeDeleted) {


                    //checking it post user is same user who wanna delete it 
                    if (postToBeDeleted.user.toString() === req.id.toString()) {
                        const newNote = await Note.findByIdAndDelete(postId);
                        res.json({ "message": "note deleted successfully" });
                    }
                    else {
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
