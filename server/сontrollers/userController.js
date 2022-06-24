const { validationResult } = require("express-validator");

const { User, Group } = require("../db/models");
const statuses = require("./controllerFunctions/statuses");


class AuthController {
    async signed(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { userid } = req.user;
        const { groupid } = req.body;

        try {
            User.findByIdAndUpdate(
                { "_id": userid },
                {
                    "$push": {
                        "signedGroups": groupid
                    }
                },
                (err) => {
                    if (err) return statuses.Status400(res, err.errors);

                    Group.findByIdAndUpdate(
                        {"_id": groupid},
                        {
                            "$inc": {"subscribers": 1}
                        },
                        (err, result) => {
                            if (err) return statuses.Status400(res, err.errors);
                            return statuses.Status201(res);
                        }
                    )
                })
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };
}

module.exports = new AuthController();