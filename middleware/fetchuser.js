var jwt = require('jsonwebtoken');
const key = "harshIsAGoodBoy@9058";
const fetchUser = (req,res,next)=>{

    //getting our webtoken from header
    try{const webToken = req.header('webToken');

    //if webToken exists 
    if(webToken){

        //verifying if there is not something fishy with our webtoken and it is returning the valid id
        const id = jwt.verify(webToken,key).id;

        //if id exists
        if(id){
            req.id = id;
            next() //calling the next function 
        }
        else{
            res.json({'message':'sorry invalid webToken please signin again '});
        }
        
    }else{
        res.json({'message':'sorry you are not authorized'});
    }}

    //if there is some error
    catch(err){
        res.json({'message':'sorry internal server error'});
    }
    
}
module.exports = fetchUser;