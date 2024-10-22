
// Подключаем библиотеку express 
import express from 'express'
// Подключаем библиотеку для создания роутеров
const router = express.Router()
// Подключаем контроллер, который обрабатывает запросы
// const postController = require('../controllers/postController')
import postController from './postController'


// Путь для получения всех постов
router.get('/all', postController.getAllPosts)

// Путь для получения конкретного post по id
router.get('/:id', postController.getPostById)

// Путь для создания одного нового post
router.post('/create', postController.createPost)

// Позволяет использовать router в файле
// module.exports = router
export default router
// Router отвечает за настройку путей, 
// Каждый путь связан с функцией в Controller, что улучшает понимание 
// где что в коде и позволяет легко изменять и добовлять код
