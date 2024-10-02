// npm run start

const moment = require("moment")
const express = require('express')
const path = require('path')

const posts = [
    //     heading: 'Post List:',
    //     posts: [{name: 'Post 1', author: 'Author 1'},
    //         {name: 'Post 2', author: 'Author 2'}]
    {
        // "heading": 'Post List:',
        "name": 'Post 0',
        "message": "long message",
        "time": "02.10.2024  03:14",
        "author": 'Author 2'
    },
    {
        "name": 'Post 1',
        "message": "long message",
        "time": "02.10.2024  03:15",
        "author": 'Author 1'
    },
    {
        "name": 'Post 0',
        "message": "long message",
        "time": "02.10.2024  03:17",
        "author": 'Author 0'
    },
    {
        "name": 'Post 1',
        "message": "long message",
        "time": "02.10.2024  03:19",
        "author": 'Author 1'
    },
]

const app = express()
const PORT = 8000
const HOST = 'localhost'

app.set('view engine', 'ejs')
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
})

app.get('/date', (req, res) => {
    console.log("someone visited the page")
    const currentDate = getCurrentDay()
    console.log(currentDate)
    res.send(`${currentDate}`)
})

app.get('/user', (req, res) => {
    const context = {
        title: 'Document',
        heading: 'заголовок',
    };
    res.render('user', context); 
})

app.get('/comments', (req, res) => {
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


app.get('/posts', (req, res) => {
    // const context = {
    //     title: 'Document',
    //     heading: 'Post List:',
    //     posts: [{name: 'Post 1', author: 'Author 1'},
    //         {name: 'Post 2', author: 'Author 2'}]
    // };
    // res.render('posts', context);
    const context = {
        title: 'Document',
        posts: posts
    }
    console.log(req.query)
    const max = req.query.max
    if (max <= posts.length) {
        context.posts = posts.slice(0, max)
    }
    res.render('posts', context)
})


app.get('/post/:id', (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const context = {
        title: 'Document',
        post: posts[id-1]
    }
    if (id <= posts.length){
        res.render('post', context)
    } else{
        res.send(`
            <p>такого поста не существует</p>
            <a href="/posts/">вернуться в posts</a>
        `);
        
    }
})

app.listen(PORT, HOST, () =>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
})
