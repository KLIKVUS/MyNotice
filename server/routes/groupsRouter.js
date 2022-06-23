const router = require("express").Router();
const { check } = require("express-validator");
const JWT = require("../сontrollers/controllerFunctions/jwt");

const groupsController = require("../сontrollers/groupsController");


router.get('/get', JWT.Check, groupsController.getGroups);

router.post('/post', [
    check("title").notEmpty().isString(),
], JWT.Check, groupsController.postGroup);

router.put('/put', [
    check("id").notEmpty().isString(),
    check("title").if(check("editors").isEmpty()).notEmpty().isString(),
    check("editors").if(check("title").isEmpty()).notEmpty().isArray()
], JWT.Check, groupsController.putGroup)

router.delete('/dell/:id', [
    check("id").notEmpty().isString(),
], JWT.Check, groupsController.deleteGroup)

module.exports = router;