const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('todo', 'postgres', 'vasuDEV7?', {
    host: 'localhost',
    dialect: 'postgres'
});

const todoModel = sequelize.define('todoItem', {
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
    }
}, {
    tableName: 'todo_table',
    timestamps: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await todoModel.sync();
        console.log('Database & tables created!');
        
        app.listen(5000, () => console.log('Server is listening on port 5000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    try {
        const todo = await todoModel.create({ title, description });
        
        res.status(201).json({ message: "Item created", item:todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allItems = await todoModel.findAll();
        res.status(200).json({ items: allItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
