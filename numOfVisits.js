const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // Require cookie-parser module
const app = express();

app.use(
    express.json(),
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser()); // Use cookie-parser middleware


function getCurrentDateTime(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const dayNum = date.getDate();
    const hours = ('0' + date.getHours()).slice(-2); // Ensure two digits
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure two digits
    const seconds = ('0' + date.getSeconds()).slice(-2); // Ensure two digits
    const timeZone = 'EST'; 
    const year = date.getFullYear();

    return `${day} ${month} ${dayNum} ${hours}:${minutes}:${seconds} ${timeZone} ${year}`;
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'exercise2.html'));
    // Logic for counting visits and setting cookies
    let numOfVisits = parseInt(req.cookies.numOfVisits) || 0;
    numOfVisits++;

    let message;
    if (numOfVisits === 1) {
        message = 'Welcome to my webpage! It is your first time that you are here.';
    } else {
        const lastVisitTime = req.cookies.lastVisitTime || 'Unknown';
        message = `Hello, this is the ${numOfVisits} time that you are visiting my webpage.\nLast time you visited my webpage on: ${lastVisitTime}`;
    }
    const currentTime = getCurrentDateTime(new Date());
    res.cookie('numOfVisits', numOfVisits, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 week in milliseconds
    res.cookie('lastVisitTime', currentTime, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.send(message);
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
