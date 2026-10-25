const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();

app.use((req, res) => {
    if (req.query.c) {
        try {
            res.send(decodeURIComponent(atob(req.query.c)));
        } catch {
            res.status(400).send("파싱 실패");
        }
    } else {
        fs.readFile(path.join(__dirname, "index.html"), "utf8", (e, d) => {
            if (e) return res.status(500).send("읽기 실패");
            res.redirect(307, `${req.path || "/"}?${new URLSearchParams({ ...req.query, c: btoa(encodeURIComponent(d)) })}`);
        });
    }
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
