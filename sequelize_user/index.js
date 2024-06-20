const express= require("express");
const cors= require("cors");
const db= require("./models/index");
const app= express();

app.use(express.json());
app.use(cors());


app.post("/addUser", async (req, res)=>{
    const {name, email,address,paymentMethod,qualification,section}= req.body;
    try{
    const sec= await db.Section.create({section});

    const user= await db.User.create({name, email,qualification,section_id:sec.id});
    address.map(async (e)=> {
        await db.Address.create({address:e.name, user_id: user.id});
    });

    res.status.send({"message":"user created"});
}catch(err){
    console.log("err"+err);
}

});


app.listen(5000, ()=>console.log("listening to 5000"));