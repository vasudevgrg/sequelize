const {Sequelize, DataTypes}= require("sequelize");
const User= require("../models/user");

const sequelize = new Sequelize('todo', 'postgres', 'vasuDEV7?', {
    host: 'localhost',
    dialect: 'postgres'
});

const TodoItem = sequelize.define('TodoItem', {
    todo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    }
}, {
    tableName: 'todo_table',
    timestamps: false
});

module.exports=TodoItem;