// npm run start

// const moment = require("moment")
import moment from "moment"
// const express = require('express')
import express, { Express, Request, Response } from 'express'
// const path = require('path')
import path from "path"
// const postRouter = require('./routers/postRouter')
import postRouter from './PostApp/postRouter'
import userRouter from './UserApp/userRouter'
import cookieParser from 'cookie-parser';

// const app = express()
const app: Express = express()
const PORT = 8001
const HOST = 'localhost'
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use(express.json()) 
app.use(cookieParser())
app.use('/static/', express.static(path.join(__dirname, 'static'))) 
app.use('/post/', postRouter)
app.use('/', userRouter)

function getCurrentDay(){
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

app.get('/', (req: Request, res: Response) => {
    // res.redirect('/login');
    const context = {
            title: 'Document',
            heading: 'заголовок',
            pageDescription: 'описание страницы'
     }
    res.render('index', context)
})

app.get('/date', (req: Request, res: Response) => {
    console.log("someone visited the page")
    const currentDate = getCurrentDay()
    console.log(currentDate)
    res.send(`${currentDate}`)
})

app.get('/user', (req: Request, res: Response) => {
    const context = {
        title: 'Document',
        heading: 'заголовок',
    };
    res.render('user', context);
})

app.get('/comments', (req: Request, res: Response) => {
    const context = {
        title: 'Document',
        heading: 'Conversations in the kitchen at three in the morning',
        comments: [
        {
            title: 'title_0',
            message: "You know, the more I think about it, the more I realize that life’s beauty lies in its unpredictability – the way opportunities arise when you least expect them, almost as if the universe has a hidden plan that only unfolds when you're not looking.",
            author: 'Lattea',
            authorImg: "/static/img/0.png"
        },
        {
            title: 'title_1',
            message: "That’s such a fascinating perspective. It’s almost like, when we stop obsessing over control and allow ourselves to flow with the current, we open up to experiences that are far richer than anything we could have planned ourselves.",
            author: 'Fedor',
            authorImg: "/static/img/1.png"
        },
        {
            title: 'title_2',
            message: "Exactly! And it makes me wonder if we spend too much time trying to define our path, when, in reality, the best moments often come from embracing the unknown, trusting that everything will eventually align in ways we couldn’t foresee.",
            author: 'Lattea',
            authorImg: "/static/img/0.png"
        },
        {
            title: 'title_3',
            message: "Totally. It’s empowering, really, to acknowledge that not having all the answers can lead to growth. In a way, the unpredictability of life isn’t something to fear, but something to celebrate as part of our journey towards discovering who we truly are.",
            author: 'Fedor',
            authorImg: "/static/img/1.png"
        }]
    };
    res.render('comments', context); 
})

app.listen(PORT, HOST, () =>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
})

