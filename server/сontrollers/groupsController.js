const mongoose = require('mongoose');
const { validationResult } = require("express-validator");

const { Group, Notifications } = require("../db/models");
const statuses = require("./controllerFunctions/statuses");


class GroupsController {
    async getGroups(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { userid, signedGroups } = req.user;
        let searchParams = { "owner": userid };
        if (signedGroups.length) {
            searchParams = {
                "$or": [
                    { "owner": userid },
                    { "_id": { "$in": signedGroups } }
                ]
            }
        }

        try {
            Group.find(searchParams, (err, result) => {
                if (err) return statuses.Status400(res, err.errors);
                if (!result.length) return statuses.Status400(res, "there is no such group");

                let filteredResult = { owns: [], signed: [] };
                for (let group of result) {
                    if (group.owner == userid) {
                        filteredResult.owns.push(group);
                        continue;
                    }
                    filteredResult.signed.push(group);
                }

                return statuses.Status200(res, filteredResult);
            })
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async postGroup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { title } = req.body;
        const { userid } = req.user;

        try {
            const group = new Group({ title, "owner": userid });
            group.save((err, result) => {
                if (err) return statuses.Status400(res, err.errors);

                const notifications = new Notifications({ "owner": userid, "group": result["_id"] });
                notifications.save();

                return statuses.Status201(res);
            })
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async putGroup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { id } = req.body.id
        const { userid } = req.user;

        try {
            Group.findOneAndUpdate(
                {
                    "$and": [
                        { "_id": id },
                        { "owner": userid }
                    ]
                },
                req.body,
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

    async deleteGroup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { id } = req.params;
        const { userid } = req.user;

        try {
            Group.findOne({
                "$and": [
                    { "_id": id },
                    { "owner": userid }
                ]
            }, (err, result) => {
                console.log(result);
                if (err) return statuses.Status400(res, err.errors);
                if (!result) return statuses.Status400(res);
                result.remove();
                return statuses.Status200(res)
            });
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };
}

module.exports = new GroupsController();