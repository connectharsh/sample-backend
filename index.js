//basic express setup
const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());



//importing our  database connection function and starting the databse connection
const connectMongo = require('./db');
connectMongo();



//handling the get and post requests
app.use('/api/updatenotes',require('./routes/updateNotes'));
app.use('/api/deletenotes',require('./routes/deleteNotes'));
app.use('/api/fetchnotes',require('./routes/fetchNotes'));
app.use('/api/login',require('./routes/login'));
app.use('/api/signup',require('./routes/signup'));
app.use('/api/addnotes',require('./routes/addNotes'));


//starting the server
app.listen(port,()=>{
    console.log('server started successfully');
})