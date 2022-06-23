const { validationResult } = require("express-validator");

const { Notifications } = require("../db/models");
const statuses = require("./controllerFunctions/statuses");


class GroupsController {
    async getNotifications(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { group } = req.params;

        try {
            Notifications.findOne(
                { "group": group },
                (err, result) => {
                    if (err) return statuses.Status400(res, err.errors);
                    if (!result) return statuses.Status400(res);
                    return statuses.Status200(res, result.notifications);
                }
            )
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async postNotification(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { userid } = req.user;
        const { group, type, title, content, lastSentAt } = req.body;

        try {
            Notifications.findOne({
                "owner": userid,
                "group": group
            }, (err, result) => {
                if (err, !result) return statuses.Status400(res, err.errors);

                Notifications.findOneAndUpdate(
                    {
                        "owner": userid,
                        "group": group
                    },
                    {
                        "$inc": { "notificationsCount": 1 },
                        "$push": {
                            "notifications": { id: result.notificationsCount + 1, type, title, content, lastSentAt }
                        }
                    },
                    { runValidators: true },
                    (err, result) => {
                        if (err) return statuses.Status400(res, err.errors);
                        if (!result) return statuses.Status400(res);
                        return statuses.Status201(res);
                    }
                )
            })
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async putNotification(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { userid } = req.user;
        const { id, group } = req.body;

        try {
            Notifications.updateOne(
                {
                    "owner": userid,
                    "group": group,
                    "notifications.id": id
                },
                { "notifications.$": req.body },
                { runValidators: true },
                (err, result) => {
                    if (err) return statuses.Status400(res, err.errors);
                    if (!result) return statuses.Status400(res);
                    return statuses.Status200(res)
                }
            );
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async deleteNotification(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { userid } = req.user;
        const { id, group } = req.params;

        try {
            Notifications.updateOne(
                {
                    "owner": userid,
                    "group": group
                },
                {
                    "$pull": { "notifications": {"id": id} }
                },
                (err, result) => {
                    if (err) return statuses.Status400(res, err.errors);
                    if (!result) return statuses.Status400(res);
                    return statuses.Status200(res)
                });
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };
}

module.exports = new GroupsController();