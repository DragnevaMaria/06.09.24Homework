// npm run start

const moment = require("moment")
const express = require('express')

const app = express()
const PORT = 8000
const HOST = 'localhost'

function getCurrentDay(){
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

app.get('/date', (req, res) => {
    console.log("someone visited the page")
    const currentDate = getCurrentDay()
    console.log(currentDate)
    res.send(`${currentDate}`)
})
app.listen(PORT, HOST, () =>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
})
