const router = require("express").Router();
const { check } = require("express-validator");

const authController = require("../сontrollers/authController");


router.post('/signin', [
    check(["login", "password"]).notEmpty().escape().trim().isString()
], authController.sigin);

router.post('/signup', [
    check(["login", "password"]).notEmpty().escape().trim().isString()
], authController.sigup);

module.exports = router;