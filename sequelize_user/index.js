const express= require("express");
const cors= require("cors");
const db= require("./models/index");
const app= express();

app.use(express.json());
app.use(cors());


app.post("/addUser", async (req, res)=>{
    const {name, email,address,profile_pic,payment,qualification,section}= req.body;
    try{
    const sec= await db.Section.create({name:section});

    const user= await db.User.create({name, email,profile_pic,qualification,section_id:sec.id});
    address.map(async (e)=> {
        await db.Address.create({address:e, user_id: user.id});
    });

    payment.map(async e=>{
      const payment1=  await db.Payment.create({payment:e, user_id:user.id});
      console.log(payment1);
    })

    res.status(201).send({"message":"user created"});
}catch(err){
    console.log("err"+err);
    res.send({"message":err})
}

});

app.get("/getUsers", async (req, res) => {
    try {
      const users = await db.User.findAll({
        include: [
          {
            model: db.Address,  
            // as: 'Addresses',    
          },
          {
            model: db.Payment,
            // as:'Payments',

          }
        ]
      });

      const payments= await db.Payment.findAll();
  
      res.json({"users": users, "payments":payments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


app.listen(5002, ()=>console.log("listening to 5002"));