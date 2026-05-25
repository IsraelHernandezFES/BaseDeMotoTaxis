const User = require('../models/User'); // Sube un nivel a src/ y entra a models/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// 1. REGISTRO DE USUARIOS
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar si ya existe el correo
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ msg: 'El correo ya está registrado, carnal.' });

        // ─── ¡AQUÍ ESTÁ EL AJUSTE CLAVE! ───
        // Encriptamos la contraseña del chofer con SHA-256 igual que el login
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Guardar en la base de datos (por defecto el rol es operator)
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: 'operator' 
        });

        res.status(201).json({ msg: 'Usuario registrado con éxito', user: { email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. LOGIN DE USUARIOS
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas.' });

        // 2. Encriptar el password recibido para compararlo con el de la base de datos
        const hashedPasswordInput = crypto.createHash('sha256').update(password).digest('hex');

        // 3. Comparación directa de strings hash
        if (hashedPasswordInput !== user.password) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // 4. Generar Token JWT (Se queda igual)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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