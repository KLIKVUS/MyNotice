const router = require("express").Router();
const { check } = require("express-validator");

const userController = require("../сontrollers/userController");
const JWT = require("../сontrollers/controllerFunctions/jwt");


router.post('/signed', [
    check("groupid").notEmpty().isString()
], JWT.Check, userController.signed);

module.exports = router;