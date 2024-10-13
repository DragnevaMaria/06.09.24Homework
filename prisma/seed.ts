
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
            id: 11
        }
    })
    console.log("Удаление одного поста", post)
}


async function seeds() {
    await createPost()
    await createPosts()
    await updatePost()
    await findPost()
    await findPosts()
    await deletePost()
}

seeds().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})