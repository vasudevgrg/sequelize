const {Sequelize, DataTypes}= require("sequelize");

const sequelize = new Sequelize('todo', 'postgres', 'vasuDEV7?', {
    host: 'localhost',
    dialect: 'postgres'
});


const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_table',
    timestamps: false
});

module.exports= User;
