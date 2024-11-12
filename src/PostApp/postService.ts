

// const posts:{
//     name:string,
//     time:string,
//     author:string,
//     message:string}[]
const posts = [
    {
        name: 'Post 0',
        message: "long message",
        time: "02.10.2024  03:14",
        author: 'Author 2'
    },
    {
        name: 'Post 1',
        message: "long message",
        time: "02.10.2024  03:15",
        author: 'Author 1'
    },
    {
        name: 'Post 0',
        message: "long message",
        time: "02.10.2024  03:17",
        author: 'Author 0'
    },
    {
        name: 'Post 1',
        message: "long message",
        time: "02.10.2024  03:19",
        author: 'Author 1'
    }
]

type Postdata = {
    name:string,
    time:string,
    author:string,
    message:string
}

// Функция для получения всех постов и  
function getAllPosts(max: number) {
    const context = {
        title: 'Document',
        posts: posts
    }
    if (max <= posts.length) {
        context.posts = posts.slice(0, max)
    }
    return context
}

// Функция для получения пост по id
function getPostById(id: number){
    console.log(id)
    const context = {
        title: 'Document',
        post: posts[id-1]
    }
    return {
        context: context,
        length: posts.length
    }
}

// Функция для добавления нового поста в массив
// function createPost(postdata: {
//     id:Number,
//     name:string,
//     time:string,
//     author:string,
//     message:string}) {
//     posts.push(postdata)
// }
function createPost(postdata: Postdata) {
    posts.push(postdata)
}


// Эти строки позволяет файлам импортировать эти три функции
const postService  = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}
export default postService 

// Service, который занимается работой с данными, получение всех постов, получение 
// поста по id, добавление нового поста. Для упрошения жизни
