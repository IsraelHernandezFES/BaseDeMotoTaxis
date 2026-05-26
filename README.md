# Sistema de Control Operativo - MotoTaxis CDMX

Este proyecto es una plataforma Full-Stack automatizada mediante contenedores para la gestión de unidades, ramales, personal operativo y bitácora de chequeo en tiempo real.

## Arquitectura del Sistema
El proyecto está construido bajo una arquitectura cliente-servidor desacoplada:
- **Frontend:** Interfaz estática responsiva con diseño Neobrutalista (HTML5, Tailwind CSS, JavaScript Asíncrono Vanilla con Fetch API). Desplegado en **GitHub Pages**.
- **Backend:** API REST construida en Node.js con Express, utilizando Sequelize como ORM.
- **Base de Datos:** MySQL 8.0 relacional con integridad referencial (Llaves foráneas).

---

## Guía de Despliegue Local (Para Evaluación)

Para ejecutar este proyecto en su estación de trabajo, no requiere instalar Node.js ni MySQL localmente; toda la infraestructura se encuentra contenerizada.

### 1. Requisitos Previos
- Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) y activo.

### 2. Clonar e Iniciar el Entorno
Abra una terminal en su computadora y ejecute los siguientes comandos:

```bash
# Clonar el repositorio fuente
git clone [https://github.com/tu-usuario/tu-repo-mototaxis.git](https://github.com/tu-usuario/tu-repo-mototaxis.git)
cd tu-repo-mototaxis

# Levantar los servicios contenerizados en segundo plano
docker compose up -d
````
3. Acceso a la Aplicación
Una vez que Docker indique que los contenedores están en estado running, usted puede interactuar con el sistema de dos formas:

Vía GitHub Pages (Recomendado): Ingrese al enlace de producción generado por GitHub: ( https://israelhernandezfes.github.io/BaseDeMotoTaxis/frontend/index.html )  (la interfaz se comunicará con los servicios de su Docker local a través de localhost:3000).

Vía Local: Abra directamente en su navegador el archivo index.html ubicado dentro de la carpeta frontend/ (o docs/).

Credenciales de Acceso para Pruebas:
Administrador (Patrón): admin@base.com | Contraseña: 123456
