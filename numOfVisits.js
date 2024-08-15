const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    let visitCount = parseInt(req.cookies.visitCount) || 0;
    visitCount++;

    let lastVisit = req.cookies.lastVisit || "First time here!";
    let currentVisit = new Date().toString();

    if (visitCount === 1) {
        res.cookie('visitCount', visitCount, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiration
        res.cookie('lastVisit', currentVisit, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiration
        res.send("Welcome to my webpage! It is your first time that you are here.");
    } else {
        res.cookie('visitCount', visitCount, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('lastVisit', currentVisit, { maxAge: 24 * 60 * 60 * 1000 });
        res.send(`Hello, this is the ${visitCount} time that you are visiting my webpage. <br>Last time you visited my webpage on: ${lastVisit}`);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

