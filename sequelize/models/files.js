const {Sequelize, DataTypes}= require("sequelize");
const TodoItem= require("./todoItem")

const sequelize = new Sequelize('todo', 'postgres', 'vasuDEV7?', {
    host: 'localhost',
    dialect: 'postgres'
});

const files= sequelize.define('files',{
    file_id: DataTypes.INTEGER,
    filename: DataTypes.STRING,
    todo_id:{
        type: DataTypes.INTEGER,
        references:{
            model: TodoItem,
            key:'todo_id'
        }
    }
},{
    tableName: 'files',
    timestamps: false
})

module.exports=files;