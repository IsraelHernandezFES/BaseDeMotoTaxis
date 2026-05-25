const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ruta = sequelize.define('Ruta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Evita duplicar ramales con el mismo nombre
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false // Ej: "Metro Pantitlán"
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false // Ej: "Colonia Ampliación"
    },
    tarifa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 15.00 // Tarifa estándar de la base
    }
}, {
    timestamps: true
});

module.exports = Ruta;