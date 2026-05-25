const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

const MotoTaxi = sequelize.define('MotoTaxi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numeroUnidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    placas: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true, // crea automáticamente los campos createdAt y updatedAt

});

module.exports = MotoTaxi;