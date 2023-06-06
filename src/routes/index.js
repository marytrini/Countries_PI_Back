const { Router } = require("express");
const countryRouter = require("./countryRoutes");
const activityRouter = require("./activityRoutes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countryRouter);
router.use("/activity", activityRouter);

module.exports = router;
