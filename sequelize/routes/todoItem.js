const express= require("express");
const {GetTodos, AddTodo}= require("../controllers/todoItem");
const router= express.Router();
const {auth}= require("../middlewares/auth");

router.get("/",auth, GetTodos);
router.post("/",auth, AddTodo);

module.exports=router;