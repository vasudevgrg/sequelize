const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express');
const cors = require('cors');
const app = express();
const jwt= require("jsonwebtoken");
const cookieParser= require("cookie-parser");
const { auth } = require('./middlewares/auth');
const userRouter= require("./routes/user");
const todoRouter= require("./routes/todoItem");
const User=require("./models/user");
const TodoItem= require("./models/todoItem");
const files= require("./models/files")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

const sequelize = new Sequelize('todo', 'postgres', 'vasuDEV7?', {
    host: 'localhost',
    dialect: 'postgres'
});



User.hasMany(TodoItem, { foreignKey: 'user_id' });
TodoItem.belongsTo(User, { foreignKey: 'user_id' });
TodoItem.hasMany(files,{foreignKey:'todo_id'});
files.belongsTo(TodoItem, {foreignKey:'todo_id'});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.sync({});
        
        
        app.listen(5000, () => console.log('Server is listening on port 5000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();



app.use("/user",userRouter);
app.use("/todos",todoRouter)