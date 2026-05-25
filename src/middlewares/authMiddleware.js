const jwt = require('jsonwebtoken');

const authorize = (rolesPermitidos) => {
    // Si pasamos un solo rol como string (ej: 'admin'), lo convertimos en arreglo automáticamente
    const roles = Array.isArray(rolesPermitidos) ? rolesPermitidos : [rolesPermitidos];

    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ msg: 'No hay token, permiso denegado.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // ¡Aquí está el ajuste! Verificamos si el rol del usuario está dentro de los permitidos
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ msg: 'No tienes los permisos necesarios para ver esto.' });
            }

            next();
        } catch (error) {
            res.status(401).json({ msg: 'Token no válido.' });
        }
    };
};

module.exports = authorize;