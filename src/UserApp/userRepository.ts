
import { client } from "../client/prismaClient"
import { PrismaClient, Prisma, User } from "@prisma/client";

// Функция для нахождения пользователя по email
async function findUserByEmail(email: string): Promise<User | null>{
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })
        // if (!user) {
        //     return {status:"error", message: "Not Found"}
        // }
        // Возвращает пользователя. если пользователь не найден null  
        return user    
    }catch (err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            // уникальность
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            // ключ
            }else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            }
        }
        console.error("ошибка:", err)
        console.log("Ошибка при поиске пользователя по Email:", err)
        // Возвращаем null в случае ошибки
        return null
    }
}

// Promise показывает, что функция асинхронная и она возвращает 
// результат после завершения операции с базой данных

// User | null показывает, что значение в Promise может быть 
// пользователя или null. Это чтобы можно было реагировать на случаи, 
// когда пользователь не найден

// Promise<User | null> показывает, что асинхронная функция вернет 
// User, если операция прошла успешно и null, если пользователя 
// не нашли и возникла ошибка
async function createUser(data: Prisma.UserCreateInput): Promise<User | null>{
    try {
        const user = await client.user.create({
            data: data
        })
        return user
    }catch (err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            // Пользователь с таким email уже существует
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            // Неправильные данные для создания пользователя
            }else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            }
        }
        console.log("ошибка:", err)
        console.log("Ошибка при создании пользователя:", err)
        // Возвращаем null в случае ошибки
        return null
    } 
} 

const userRepository = {
    findUserByEmail, 
    createUser 
}

export default userRepository

  

// // Функция для нахождения пользователя по email
// async function findUserByEmail(email: string){
//     // Используйте `where` с уникальным полем, например, с `id`
//     const user = await prisma.user.findUnique({
//         where: {
//             email: email, // Это сработает только если email уникален
//         }
//     })
//     // Возвращаем пользователя или null, если не найден
//     return user; 
// }