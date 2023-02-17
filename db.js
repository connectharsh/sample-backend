const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/ultimateBackend?directConnection=true";



const connectMongo = ()=>{
    mongoose.connect(url,()=>{
    mongoose.set('strictQuery', true);
    console.log('connected to database succesfully');
});}


module.exports = connectMongo;
