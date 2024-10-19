
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

// Создание одного поста
async function createPost(){
    const post = await prisma.post.create({
        data: {
            name: 'Post 0',
            message: 'long message',
            time: '02.10.2024  03:14',
            author: 'Author 2'
        }
    })
    console.log("Создание одного поста", post)
}

// Создание множества постов
async function createPosts(){
    const posts = await prisma.post.createMany({
        data: [
            {
                name: 'Post 1',
                message: 'long message',
                time: '02.10.2024  03:15',
                author: 'Author 1'
            },
            {
                name: 'Post 2',
                message: 'long message',
                time: '02.10.2024  03:17',
                author: 'Author 0'
            }
        ]
    })
    console.log("Создание множества постов", posts)
}

// Обновления данных одного поста
async function updatePost() {
    const post = await prisma.post.update({
        where: {
            id: 2
        },
        data: {
            name: 'Updated post'
        }
    })
    console.log("Обновления данных одного поста", post)
}

// Получение одного поста
async function findPost() {
    const post = await prisma.post.findUnique({
        where: {
            id: 5,
        }
    })
    console.log("Получение одного поста", post)
}

// Получение множества постов
async function findPosts() {
    const posts = await prisma.post.findMany({
        where: {
            author: 'Author 2'
        }
    })
    console.log("Получение множества постов", posts)
}

// Удаление одного поста
async function deletePost() {
    const post = await prisma.post.delete({
        where: {
            id: 5
        }
    })
    console.log("Удаление одного поста", post)
}


// -----------------------------------------------

// Создание одного коментария
async function createComment(){
    const comment = await prisma.comment.create({
        data: {
            title: "1 Comment",
            message: 'long message',
            imageUrl: "https://ichef.bbci.co.uk/images/ic/640xn/p07ryyyj.jpg.webp",
            postId: 3
        }
    })
    console.log("Создание одного коментария", comment)
}

// Создание множества коментариев
async function createComments(){
    const comments = await prisma.comment.createMany({
        data: [
            {
                title: "2 Comment",
                message: 'long message',
                imageUrl: "https://ichef.bbci.co.uk/images/ic/640xn/p07ryyyj.jpg.webp",
                postId: 1
            },
            {
                title: "3 Comment",
                message: 'long message',
                postId: 2
            }
        ]
    })
    console.log("Создание множества коментариев", comments)
}

// Получение коментария по id
async function findCommentId() {
    const comment = await prisma.comment.findUnique({
        where: {
            id: 1,
        }
    })
    console.log("Получение коментария по id", comment)
}


// Поиск комментария по id с выводом информации о посте
async function findCommentIdAndInfo() {
    const found = await prisma.comment.findUnique({
        where: { 
            id: 2
        },
        include: { 
            post: true 
        } 
    })
    console.log("Поиск комментария по id с выводом информации о посте",found)
}

// Поиск поста по id с комментариями
async function findPostIdWithComments() {
    const foundPostWithComments = await prisma.post.findUnique({
      where: { 
        id: 2
    },
      include: { 
        comments: true 
    }
    })
    console.log("Поиск поста по id с комментариями", foundPostWithComments)
}

// Обновления данных коментария
async function updateComment() {
    const comment = await prisma.comment.update({
        where: {
            id: 2
        },
        data: {
            message: 'long message',
        }
    })
    console.log("Обновления данных коментария", comment)
}

// Удаление одного коментария
async function deleteComment() {
    const comment = await prisma.comment.delete({
        where: {
            id: 1
        }
    })
    console.log("Удаление одного коментария", comment)
}

async function seeds() {
    await createPost()
    await createPosts()
    await updatePost()
    await findPost()
    await findPosts()
    await deletePost()
    await createComment()
    await createComments()
    await findCommentId()
    await findCommentIdAndInfo()
    await findPostIdWithComments()
    await updateComment()
    await deleteComment()
}

seeds().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})