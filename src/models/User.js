const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

//definimos la tabla de usuarios
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('operator', 'admin'),
        defaultValue: 'operator', 
        allowNull: false
    }
}, {
    timestamps: true,      ///crea automáticamente los campos createdAt y updatedAt
});

module.exports = User;
