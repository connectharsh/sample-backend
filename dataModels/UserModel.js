const mongoose = require('mongoose');
const {Schema} = mongoose;
 
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
        unique:true,
    },
    dob:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String,
        required:true,

    }
});
module.exports =  mongoose.model('User',userSchema);
