const mongoose = require('mongoose');
const {Schema} = mongoose;

const notesSceham = new Schema({
    user: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String ,
        required : true
    },
    date:{
        type :Date,
        default:Date.now
    },
    tags:{
        type:String,
        default:'general',
    }
});
module.exports = mongoose.model('Note',notesSceham);