
// Подключаем Service, который отвечает за бизнес-логику (логику работы 
// с данными постов)
// const postService = require('../services/postService')
import { Request, Response } from 'express'
import postService from '../services/postService'

// Запрос на получение всех постов
function getAllPosts(req: Request, res: Response): void{
    const context = postService.getAllPosts(Number(req.query.max))
    res.render('posts', context)
}

// Запрос на получение конкретного поста по его id
function getPostById(req: Request, res: Response): void{
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
function createPost(req: Request, res: Response): void{
    const postdata = req.body as {
        name: string;
        message: string;
        time: string;
        author: string;
    }
    console.log(postdata)
    postService.createPost(postdata)
    res.send(`
        <p>все хорошо</p>
    `)
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