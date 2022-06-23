const router = require("express").Router();

const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../docs/docs");


router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = router;