const Ruta = require('../models/Ruta');

// 1. OBTENER TODAS LAS RUTAS
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Ruta.findAll({ order: [['nombre', 'ASC']] });
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. CREAR NUEVA RUTA
exports.createRoute = async (req, res) => {
    try {
        const { nombre, origen, destino, tarifa } = req.body;

        const existRoute = await Ruta.findOne({ where: { nombre } });
        if (existRoute) return res.status(400).json({ msg: 'Ese nombre de ruta ya existe, patrón.' });

        const newRoute = await Ruta.create({ nombre, origen, destino, tarifa });
        res.status(201).json({ msg: 'Ruta registrada con éxito', route: newRoute });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. ACTUALIZAR RUTA
exports.updateRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, origen, destino, tarifa } = req.body;

        const route = await Ruta.findByPk(id);
        if (!route) return res.status(404).json({ msg: 'Ruta no encontrada.' });

        await route.update({ nombre, origen, destino, tarifa });
        res.json({ msg: 'Ruta actualizada con éxito', route });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ELIMINAR RUTA
exports.deleteRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Ruta.findByPk(id);
        if (!route) return res.status(404).json({ msg: 'Ruta no encontrada.' });

        await route.destroy();
        res.json({ msg: 'Ruta eliminada de la base.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};