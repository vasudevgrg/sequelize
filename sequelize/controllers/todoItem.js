const User=require("../models/user");
const TodoItem= require("../models/todoItem");

const AddTodo=async (req, res) => {
    const userId  = req.user_id;
    const { title, description } = req.body;
    try {
        const user = await User.findByPk(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const todo = await TodoItem.create({ title, description, user_id: userId });
        res.status(201).json({ message: "Todo item created", "item":todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const GetTodos= async (req, res) => {
    const  userId  = req.user_id;

    try {
        // const user = await User.findByPk(userId, {
        //     include: TodoItem
        // });
        const todoItems= await TodoItem.findAll({
            where:{
                user_id:userId
            }
        });
        
       res.send({"items":todoItems});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports={GetTodos, AddTodo};