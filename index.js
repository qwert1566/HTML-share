const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();

const d = btoa(encodeURIComponent(fs.readFileSync(path.join(__dirname, "index.html"), "utf8")));
app.use((req, res) => {
    if (req.query.c) {
        try {
            res.send(decodeURIComponent(atob(req.query.c)));
        } catch {
            res.status(400).send("파싱 실패");
        }
    } else {
        if (!d) return res.status(500).send("읽기 실패");
        // 임시 리다이렉트는 클라이언트에서 캐싱되지 않음ㅎㅎ
        res.redirect(307, `${req.path || "/"}?${new URLSearchParams({ ...req.query, c: d })}`);
    }
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
