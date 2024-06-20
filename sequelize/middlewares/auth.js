  const jwt= require("jsonwebtoken");
  
  
  const auth= (req, res, next)=>{
    const token= req.cookies.token;
    console.log(token);

    const data= jwt.verify(token, "secret");
    if(data){
        
        req.user_id= data.user_id;
        next();
    }else{
        res.send({"message":"user not registered"});
    }
}

module.exports={auth};