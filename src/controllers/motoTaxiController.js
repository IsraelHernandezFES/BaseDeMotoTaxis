const MotoTaxi = require('../models/MotoTaxi');

// obtener todos los mototaxis
exports.getAllUnits = async (req, res) => {
    try {
        const units = await MotoTaxi.findAll({order: [['numeroUnidad', 'ASC']]});
        res.json(units);
    } catch (error) {
        console.error('Error al obtener las unidades:', error);
        res.status(500).json({ error: 'Error al obtener las unidades' });
    }
};

// crear unidad solo admin
exports.createUnit = async (req, res) => {
    try {
        const { numeroUnidad, placas, modelo } = req.body;
        
        const existUnit = await MotoTaxi.findOne({ where: { numeroUnidad } });
        if (existUnit) {
            return res.status(400).json({ error: 'La unidad ya existe' });
        }
        const existPlacas = await MotoTaxi.findOne({ where: { placas } });
        if (existPlacas) {
            return res.status(400).json({ error: 'Las placas ya están registradas' });
        }

        const newUnit = await MotoTaxi.create({ numeroUnidad, placas, modelo });
        res.status(201).json({ message: 'Unidad creada exitosamente', unit: newUnit });
    } catch (error) {
        console.error('Error al crear la unidad:', error);
        res.status(500).json({ error: 'Error al crear la unidad' });
    }
};

// actualizar unidad solo admin
exports.updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { numeroUnidad, placas, modelo } = req.body;

        const unit = await MotoTaxi.findByPk(id);
        if (!unit) {
            return res.status(404).json({ error: 'Unidad no encontrada' });
        }

        await unit.update({ numeroUnidad, placas, modelo });
        res.json({ message: 'Unidad actualizada exitosamente', unit });
    } catch (error) {
        console.error('Error al actualizar la unidad:', error);
        res.status(500).json({ error: 'Error al actualizar la unidad' });
    }
};

// eliminar unidad solo admin
exports.deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await MotoTaxi.findByPk(id);
        if (!unit) {
            return res.status(404).json({ error: 'Unidad no encontrada' });
        }
        await unit.destroy();
        res.json({ message: 'Unidad eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la unidad:', error);
        res.status(500).json({ error: 'Error al eliminar la unidad' });
    }
};
