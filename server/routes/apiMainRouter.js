const router = require("express").Router();

const authRouter = require("./authRouter");
const groupsRouter = require("./groupsRouter");
const notificationsRouter = require("./notificationsRouter")
const userRouter = require("./userRouter")


router.use("/auth", authRouter);
router.use("/groups", groupsRouter);
router.use("/notifications", notificationsRouter);
router.use("/user", userRouter);

module.exports = router;