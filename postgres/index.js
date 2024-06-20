const express= require("express");
const app= express();

const cors= require("cors");
const bodyParser= require("body-parser");
const pool= require("./db");
const { uploadMiddleware } = require("./middlewares/multer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/image", express.static("assets"));

app.post("/todos",uploadMiddleware,async (req, res)=>{
    const {title, description}= req.body;
  
    try{
    const updatedItem=await pool.query("INSERT INTO todo_table (title,description) VALUES($1, $2) returning *" , [title,description]);
    console.log(updatedItem.rows);

    const updatedFile= await pool.query("Insert into files (filename, todo_id) values ($1, $2) ",[req.filename, updatedItem.rows[0].todo_id]);

    console.log(updatedItem.rows[0]);
    res.json(updatedItem.rows[0]);
    }catch (err){
        res.json({"message ": err.message});
    }
} );

app.get("/todos", async (req, res)=>{
    const query= "SELECT * FROM todo_table";
    const items= await pool.query(query);
    res.send({items:items.rows} );

});

app.get("/todos/:id", async (req, res)=>{
    
    const id= req.params.id;
 
    const filename=await pool.query("select filename from files where todo_id=$1",[id]);
    console.log(filename.rows);
    res.send({"filename": filename.rows[0]});
})

app.delete("/todos/delete/:id", async (req, res)=>{
    const query_todotable="delete from todo_table where todo_id=($1)";
    const query_files= "delete from files where todo_id=($1)";
    await pool.query(query_files, [req.params.id]);
    await pool.query(query_todotable, [req.params.id]);
    const arr= await pool.query("SELECT * from todo_table");
    file.unlink();
    res.send({"message":"deleted", "arr": arr.rows});
});



// app.listen(5000, ()=>console.log("listening to 5000"));