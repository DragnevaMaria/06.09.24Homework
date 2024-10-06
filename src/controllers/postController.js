// Подключаем Service, который отвечает за бизнес-логику (логику работы 
// с данными постов)
const postService = require('../services/postService')

// Запрос на получение всех постов
function getAllPosts(req, res) {
    const context = postService.getAllPosts()
    res.render('posts', context)
}

// Запрос на получение конкретного поста по его id
function getPostById(req, res){
    console.log(req.params.id)
    const id = req.params.id
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
function createPost(req, res){
    const postdata = req.body
    console.log(postdata)
    postService.createPost(postdata)
    res.send(`
        <p>все хорошо</p>
    `)
}

// Эти строки позволяет файлам импортировать эти три функции
module.exports = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}

// Controller содержит функции которые обрабатывают запроси и 
// возвращают ответ пользователю.