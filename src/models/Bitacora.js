const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const MotoTaxi = require('./MotoTaxi');

const Bitacora = sequelize.define('Bitacora', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA', 'SALIDA'),
        allowNull: false
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false // No necesitamos createdAt/updatedAt porque ya usamos fechaHora
});

// Relaciones (Llaves Foráneas)
Bitacora.belongsTo(User, { foreignKey: 'userId', as: 'operador' });
Bitacora.belongsTo(MotoTaxi, { foreignKey: 'motoTaxiId', as: 'unidad' });

module.exports = Bitacora;