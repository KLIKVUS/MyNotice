const { validationResult } = require("express-validator");

const { User } = require("../db/models");
const statuses = require("./controllerFunctions/statuses");
const JWT = require("./controllerFunctions/jwt");


class AuthController {
    async sigin(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { login, password } = req.body;

        try {
            User.findOne({ login }, (err, result) => {
                if (err) return statuses.Status400(res, err.errors);
                if (!result) return statuses.Status400(res, "there is no such user");
                if (login == result["login"] && password == result["password"]) {
                    const accessToken = JWT.Create({ "userid": result["_id"], "signedGroups": result["signedGroups"] });
                    return statuses.Status200(res, { "token": accessToken });
                }
                else return statuses.Status400(res, "wrong data");
            })
        } catch (err) {
            console.log(err);
            statuses.Status500(res);
        }
    };

    async sigup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return statuses.Status400(res, errors.errors);

        const { login, password } = req.body;

        try {
            User.findOne({ login }, (err, result) => {
                if (err) return statuses.Status400(res, err.errors);
                if (result) return statuses.Status400(res, "login is busy");

                const user = new User({ login, password })
                user.save((err, result) => {
                    if (err) return statuses.Status400(res, err.errors);

                    const accessToken = JWT.Create({ "userid": result["_id"], "signedGroups": result["signedGroups"] });
                    return statuses.Status201(res, { "token": accessToken });
                })
            })

        } catch (err) {
            console.log(err);
            statuses.Status500(res)
        }
    };
}

module.exports = new AuthController();