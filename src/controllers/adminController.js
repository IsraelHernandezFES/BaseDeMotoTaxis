const User = require('../models/User');

// 1. OBTENER TODOS LOS OPERADORES (Solo usuarios con rol 'operator')
exports.getOperators = async (req, res) => {
    try {
        const operators = await User.findAll({
            where: { role: 'operator' },
            attributes: ['id', 'email', 'createdAt'], // No mandamos la contraseña por seguridad
            order: [['createdAt', 'DESC']]
        });
        res.json(operators);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. ACTUALIZAR CORREO DEL OPERADOR
exports.updateOperator = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const user = await User.findByPk(id);
        if (!user || user.role !== 'operator') {
            return res.status(404).json({ msg: 'Operador no encontrado.' });
        }

        await user.update({ email });
        res.json({ msg: 'Datos del operador actualizados', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. DAR DE BAJA / ELIMINAR OPERADOR
exports.deleteOperator = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user || user.role !== 'operator') {
            return res.status(404).json({ msg: 'Operador no encontrado.' });
        }

        await user.destroy();
        res.json({ msg: 'Operador dado de baja de la base correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};