
const jwt= require("jsonwebtoken");
const UserService= require("../services/user");

const Signup= async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = UserService.createUser(username, password);
        
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login= async (req, res)=>{
    const {username, password}= req.body;

    const user=await UserService.findUser(username, password);

    if(!user){
        res.status(404).send({"message":"user doesnt exist"});

    }
    console.log(user.user_id);
    const token= jwt.sign({user_id:user.user_id}, "secret");
    console.log(user.user_id);
    res.cookie("token", token , {
        httpOnly:true,
        secure:false
    })
    res.send({"message":"user logged in", user:user});
};

module.exports={login, Signup};