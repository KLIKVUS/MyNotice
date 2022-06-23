const express = require("express");
const app = express();

const docsRouter = require("./server/routes/docsRouter");
const apiMainRouter = require("./server/routes/apiMainRouter")

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.static("./public"));

app.use("/api", apiMainRouter);
app.use("/api-docs", docsRouter);
app.get("*", (req, res) => {
    // res.sendStatus(404).send({
    //     status: 404,
    //     msg: "I don't have such an API, but you can read the documentation. To do this, go to the path /api-docs."
    // });
    res.redirect(404, "api-docs");
});

app.listen(PORT, (e) => {
    if (e) return console.error("-- Boss we have error \n error msg:", e);
    if (process.env.PORT) return console.log("Server listening on yours url");
    return console.log(`Server listening on http://localhost:${PORT}`);
});