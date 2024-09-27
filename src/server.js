// npm run start

const moment = require("moment")
const express = require('express')
const path = require('path')

const app = express()
const PORT = 8000
const HOST = 'localhost'

//ставимо движок 
app.set('view engine', 'ejs')
//встановлюємо папки з шаблонами для ejs
app.set('views', path.join(__dirname, 'templates'))


app.use('/static/', express.static(path.join(__dirname, 'static'))) 

function getCurrentDay(){
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

app.get('/', (req, res) => {
    const context = {
            title: 'Document',
            heading: 'заголовок',
            pageDescription: 'описание страницы'
     }
    res.render('index', context)
    // res.sendFile(path.resolve(__dirname, "./templates/index.ejs"))
})

app.get('/date', (req, res) => {
    console.log("someone visited the page")
    const currentDate = getCurrentDay()
    console.log(currentDate)
    res.send(`${currentDate}`)
})

app.get('/posts', (req, res) => {
    const context = {
        title: 'Document',
        heading: 'Post List:',
        question: 'расположить все элементы вертикально и горизонтально в центре',
        posts: [{name: 'Post 1', author: 'Author 1'},
            {name: 'Post 2', author: 'Author 2'}]
    };
    res.render('posts', context);
    
})

app.get('/user', (req, res) => {
    const context = {
        title: 'Document',
        heading: 'заголовок',
    };
    res.render('user', context); 
})



app.listen(PORT, HOST, () =>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
})
