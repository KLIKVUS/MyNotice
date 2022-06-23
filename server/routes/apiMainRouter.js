const router = require("express").Router();

const authRouter = require("./authRouter");
const groupsRouter = require("./groupsRouter");
const notificationsRouter = require("./notificationsRouter")


router.use("/auth", authRouter);
router.use("/groups", groupsRouter);
router.use("/notifications", notificationsRouter);

module.exports = router;