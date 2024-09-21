// npm run start

const moment = require("moment")
const express = require('express')
const path = require('path')

const app = express()
const PORT = 8000
const HOST = 'localhost'

app.use('/static/', express.static(path.join(__dirname, 'static'))) 

function getCurrentDay(){
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
})


app.get('/date', (req, res) => {
    console.log("someone visited the page")
    const currentDate = getCurrentDay()
    console.log(currentDate)
    res.send(`${currentDate}`)
})

app.listen(PORT, HOST, () =>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
})
