const express= require("express");
const cors= require("cors");
const db= require("./models/index");

const app= express();
app.use(cors());
app.use(express.json());

app.get("/allUsers", async (req, res)=>{
    const users= await db.User.findAll();
    res.send({"allusers":users});
})

app.post("/adduser", async (req, res)=>{
    const {username, password, payment}= req.body;
    console.log(payment);
    const newItem= await db.User.create({username, password, payment});
    res.send({"newItem": newItem});
});

app.listen(5000, ()=>console.log("listening to port 5000"));