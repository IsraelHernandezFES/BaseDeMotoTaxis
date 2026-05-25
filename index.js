const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');
const cors = require('cors'); // <── 1. Importar el paquete
const User = require('./src/models/User'); 
const motoTaxiRoutes = require('./src/routes/motoTaxiRoutes'); // Importar rutas de mototaxi
const authRoutes = require('./src/routes/authRoutes'); // 1. Importar rutas
const adminRoutes = require('./src/routes/adminRoutes'); // Importar rutas de admin
const rutaRoutes = require('./src/routes/rutaRoutes'); // <── Importar rutas de rutas
const bitacoraRoutes = require('./src/routes/bitacoraRoutes'); // Importar rutas de bitácora
const crypto = require('crypto');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// 2. Vincular las rutas a la URL /api/auth
app.use(cors()); // <── 2. Habilitar CORS para cualquier origen público
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', motoTaxiRoutes); // Vincular rutas de mototaxi
app.use('/api/routes', rutaRoutes); // <── Vincular a Express
app.use('/api/logs', bitacoraRoutes); // Vincular rutas de bitácora
app.get('/', (req, res) => {
    res.json({ mensaje: "¡API de Base de MotoTaxis corriendo!" });
});

const startServer = async (retries = 10, delay = 3000) => {
    while (retries) {
        try {
            await sequelize.sync({ alter: true });
            console.log('----------------------------------------------------');
            console.log('¡Conexión a MySQL establecida y tablas sincronizadas!');
            console.log('----------------------------------------------------');
            
            // Sembrado automático del Administrador
            try {
                const adminExiste = await User.findOne({ where: { role: 'admin' } });
                if (!adminExiste) {
                    
                    // Encriptamos usando SHA-256 nativo de Node
                    const hashedPassword = crypto.createHash('sha256').update('123456').digest('hex');

                    await User.create({
                        email: 'admin@base.com',
                        password: hashedPassword, 
                        role: 'admin'
                    });
                    console.log('¡Semilla plantada con Crypto! Administrador creado (admin@base.com).');
                } else {
                    console.log('El administrador ya existe en la base de datos. Todo listo.');
                }
            } catch (seedError) {
                console.error('Error al sembrar el usuario administrador:', seedError.message);
            }

            app.listen(PORT, () => {
                console.log(`Servidor escuchando en el puerto ${PORT}`);
            });
            break; 
        } catch (err) {
            retries--;
            console.log(`[Docker-BD] Base de datos no lista. Reintentando... Quedan: ${retries}`);
            if (retries === 0) {
                console.error('Error final:', err.message);
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

startServer();