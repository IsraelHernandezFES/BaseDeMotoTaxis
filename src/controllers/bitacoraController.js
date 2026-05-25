const Bitacora = require('../models/Bitacora');
const User = require('../models/User');
const MotoTaxi = require('../models/MotoTaxi');

// 1. OBTENER TODA LA BITÁCORA CON SUS RELACIONES (JOIN)
exports.getLogs = async (req, res) => {
    try {
        const logs = await Bitacora.findAll({
            include: [
                { model: User, as: 'operador', attributes: ['email'] },
                { model: MotoTaxi, as: 'unidad', attributes: ['numeroUnidad', 'placas'] }
            ],
            order: [['fechaHora', 'DESC']]
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. REGISTRAR UNA ENTRADA O SALIDA
exports.createLog = async (req, res) => {
    try {
        const { userId, motoTaxiId, tipo } = req.body;

        // Validar que existan
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: 'Operador no encontrado.' });

        const moto = await MotoTaxi.findByPk(motoTaxiId);
        if (!moto) return res.status(404).json({ msg: 'Unidad no encontrada.' });

        const newLog = await Bitacora.create({ userId, motoTaxiId, tipo });
        
        // Devolver el registro armado
        const completeLog = await Bitacora.findByPk(newLog.id, {
            include: [
                { model: User, as: 'operador', attributes: ['email'] },
                { model: MotoTaxi, as: 'unidad', attributes: ['numeroUnidad'] }
            ]
        });

        res.status(201).json({ msg: 'Chequeo registrado', log: completeLog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};