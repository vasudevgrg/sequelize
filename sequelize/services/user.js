const User= require("../models/user");
class UserService{

     findUser=async (username, password)=>{
        try{
        const user= await User.findAll({
            where:{
                username:username,
                password: password
            }
        });
        return user[0];}catch(err){
            throw new Error(err);
        }
    };
createUser=async (username, password)=>{
   const user= await User.create({ username, password });
   return user;
}

};

module.exports= new UserService();