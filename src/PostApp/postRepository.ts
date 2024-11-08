
import {Prisma, PrismaClient } from '@prisma/client' 
import { client } from "../client/prismaClient"


// Получение всех постов
async function getAllPosts(){
    try{
        const posts = await client.post.findMany({

        })
        return posts
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Получение одного поста
async function getPostById(id: number) {
    try{
        const post = await client.post.findUnique({
            where: {
                id: id
            }
        })
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Получение всех постов по id
async function getAllPostsById(id: number){
    try{
        const post = await client.post.findUnique({
            where:{
                id: id
            }
        })
    return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Создание одного поста
async function createPost(data: Prisma.PostCreateInput){
    try{
        const post = await client.post.create({
            data: data
        })
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Создание множества постов
async function createPosts(data: Prisma.PostCreateManyInput[]){
    try{
        const posts = await client.post.createMany({
            data: data
        })
        return posts
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Обновления данных одного поста
async function updatePost(id: number) {
    try{
        const post = await client.post.update({
            where: {
                id: id
            },
            data: {
                name: 'Updated post'
            }
        })
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

// Удаление одного поста
async function deletePost() {
    try{
        const post = await client.post.delete({
            where: {
                id: 5
        }
    })
    return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2015') {
                console.log(err.message);
                throw err;
            } else if (err.code === 'P2019') {
                console.log(err.message);
                throw err;
            }
        }
    }
}

    


const postRepository = {
    getAllPosts:getAllPosts,
    getPostById:getPostById,
    getAllPostsById:getAllPostsById,
    createPost:createPost,
    createPosts:createPosts,
    updatePost:updatePost,
    deletePost:deletePost

    // createComment:createComment
    // createComments:createComments
    // findCommentId:findCommentId
    // findCommentIdAndInfo:findCommentIdAndInfo
    // findPostIdWithComments:findPostIdWithComments
    // updateComment:updateComment
    // deleteComment:deleteComment
}
export default postRepository