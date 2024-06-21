const express= require("express");
const cors= require("cors");
const db= require("./models/index");
const app= express();

app.use(express.json());
app.use(cors());


app.post("/addUser", async (req, res)=>{
    const {name, email,address,profile_pic,paymentMethod,qualification,section}= req.body;
    try{
    const sec= await db.Section.create({name:section});

    const user= await db.User.create({name, email,profile_pic,qualification,section_id:sec.id});
    address.map(async (e)=> {
        await db.Address.create({address:e.name, user_id: user.id});
    });

    res.status(201).send({"message":"user created"});
}catch(err){
    console.log("err"+err);
    res.send({"message":err})
}

});

app.get("/users", async (req, res) => {
    try {
      const users = await db.User.findAll({
        include: [
          {
            model: db.Address,  
            as: 'Addresses',    
          }
        ]
      });
  
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


app.listen(5002, ()=>console.log("listening to 5002"));