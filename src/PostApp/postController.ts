
// Подключаем Service, который отвечает за бизнес-логику (логику работы 
// с данными постов)
// const postService = require('../services/postService')
import { Request, Response } from 'express'
import postService from './postService'

// Запрос на получение всех постов
async function getAllPosts(req: Request, res: Response){
    const context = await postService.getAllPosts(Number(req.query.max))
    res.render('posts', {posts: context.posts, username: res.locals.user.username})
    // res.render('posts', context)
    console.log(res.locals.user)
}

// : void говорит, что эта функция не возвращает никакого значения 
// завершится без использования оператора return
// function getPostById(req: Request, res: Response): void{

// Запрос на получение конкретного поста по его id
function getPostById(req: Request, res: Response){
    console.log(req.params.id)
    const id = Number (req.params.id)
    const data = postService.getPostById(id)
    if (id <= data.length){
        res.render('post', data.context)
    } else{
        res.send(`
            <p>такого поста не существует</p>
            <a href="/post/all">вернуться в posts</a>
        `)
    }
}

// Запрос на создание нового поста
function createPost(req: Request, res: Response){
    // const postdata = req.body as {
    //     name: string;
    //     message: string;
    //     time: string;
    //     author: string;
    // }
    const postdata = req.body
    console.log(postdata)
    postService.createPost(postdata)
    res.send('okay')
    // const postmessage = postService.createPost(postdata)
    // res.send(postmessage)
}

// Эти строки позволяет файлам импортировать эти три функции
const postController = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}
export default postController
// Controller содержит функции которые обрабатывают запроси и 
// возвращают ответ пользователю.