const jwt = require("jsonwebtoken");
const statuses = require("./statuses");

const accessTokenSecret = "QeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5";


class JWT {
    Create(data) {
        const accessToken = jwt.sign(data, accessTokenSecret);
        return accessToken;
    }
    
    Check(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) return statuses.Status403(res);
                req.user = user;
                next();
            });
        } else statuses.Status401(res);
    }
}

module.exports = new JWT();