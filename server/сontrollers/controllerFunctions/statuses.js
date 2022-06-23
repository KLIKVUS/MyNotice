class Statuses {
    Status200(res, result) {
        let data = {
            status: 200,
            msg: "successful operation"
        }
        if (result) data.result = result;
        return res.status(200).send(data);
    }

    Status201(res, result=undefined) {
        let data = {
            status: 201,
            msg: "created"
        }
        if (result) data.result = result;
        return res.status(201).send(data);
    }

    Status400(res, errors) {
        return res.status(400).send({
            status: 400,
            msg: "bad request",
            errors: errors
        });
    }

    Status401(res) {
        return res.status(401).send({
            status: 401,
            msg: "unauthorized",
        });
    }

    Status403(res) {
        return res.status(403).send({
            status: 403,
            msg: "forbidden",
        });
    }
    
    Status500(res) {
        return res.status(500).send({
            status: 500,
            msg: "sry but whe have problem",
        });
    }
}

module.exports = new Statuses();