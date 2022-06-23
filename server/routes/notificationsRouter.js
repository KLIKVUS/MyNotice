const router = require("express").Router();
const { check } = require("express-validator");
const JWT = require("../сontrollers/controllerFunctions/jwt");

const notificationsController = require("../сontrollers/notificationsController");


router.get('/get/:group', 
    check("group").notEmpty().isString(),
    JWT.Check, notificationsController.getNotifications);

router.post('/post', [
    check("group").notEmpty().isString(),
    check("type").optional().isIn(["SUCCESS", "WARNING", "FAIL"]),
    check("title").notEmpty().isString(),
    check("content").optional().isString(),
    check("lastSentAt").optional().isInt()
], JWT.Check, notificationsController.postNotification);

router.put('/put', [
    check("id").notEmpty().isInt(),
    check("group").notEmpty().isString(),
    check("type").exists().optional().isIn(["SUCCESS", "WARNING", "FAIL"]),
    check("title").exists().optional().isString(),
    check("content").exists().optional().isString(),
    check("lastSentAt").exists().optional().isInt()
], JWT.Check, notificationsController.putNotification)

router.delete('/dell/:group/:id', [
    check("id").notEmpty().isInt()
], JWT.Check, notificationsController.deleteNotification)

module.exports = router;