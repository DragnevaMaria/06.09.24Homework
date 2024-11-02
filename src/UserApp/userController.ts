import {Request,Response} from "express"
import userService from "./userService"
import { sign } from "jsonwebtoken"
import { SECRET_KEY } from "../config/token"

function loginUser(req:Request,res:Response){
    res.render("login")
}

async function authUser(req:Request, res:Response){
    console.log(req.body)
    // Сохраняем данные из тела запроса email и пароль в data
    const data = req.body
    // В функцию authLogin из сервиса userService, передаtn пароль и email, которые были извлечены из тела запроса. Ожидает 
    // (используя await), пока функция завершится, и сохраняет
    // (объект пользователя или сообщение об ошибке) в переменной user
    const user = await userService.authLogin(data.password, data.email)
    // Проверка ошибок в работе authLogin
    if (user.status == "error") {
        res.send(user.message)
    // Если статус = "ok", значает аутентификация прошла успешно, и 
    // можно продолжить работу
    } else if (user.status == "ok") {
        // sign из библиотеки jsonwebtoken, 
        // где: user.user — это данные пользователя, 
        // которые будут закодированы в токен 
        // SECRET_KEY — это секретный ключ токен
        // { expiresIn: "1d" } — задаёт срок действия токена 1 день 
        const token = sign(user.user, SECRET_KEY, {expiresIn : "1d"})
        // сохраняет токен в куках у пользователя
        res.cookie("token", token)
        // Отправляет статус 200 "ok" пользователю что означает успешное
        // завершение операции аутентификации
        res.sendStatus(200)
    }
}
// 400 = error, 200 = good
async function authRegistUser(req: Request, res: Response): Promise<void>{
    console.log(req.body)
    // Сохраняем данные из тела запроса
    const data = req.body
    // Отправляем данные в сервис для регистрации
    const user = await userService.authRegist(data.username, data.email, data.password)
    // Проверка полученного ответа от сервиса
    if (user.status === "error") {
        // Отправляем сообщение об ошибке
        res.send(user.message) 

    } else if (user.status === "ok") {
        // Если пользователь успешно зарегистрирован
        const token = sign(user.user, SECRET_KEY, { expiresIn: "1d" })
        // сохраняет токен в куках у пользователя
        res.cookie("token", token)
         // Отправляем созданного пользователя
        res.sendStatus(200)
        // res.status(201).json(user.user)
    }
    // res.sendStatus(500)
}

function registerUser(req:Request, res:Response){
    res.render("regist")
}

const userController = {
  loginUser,
  authUser: authUser,
  registerUser,
  authRegistUser
}
export default userController


// async function authRegistUser(req:Request, res:Response){
//     console.log(req.body)
//     // Сохраняем данные из тела запроса email и пароль в data
//     // const { username, email, password } = req.body
//     const data = req.body
//     // Отправляем данные в сервис для регистрации
//     const user = await userService.authRegist(data.password, data.email, data.username)

//     // Проверка полученного ответа от сервиса
//     if (user.status === "error") {
//         // Если пользователь уже существует, отправляем сообщение об ошибке
//         res.send(user.message)
//         // return res.status(400).send("User already exists")
//     } else if (user.status == "ok") {
//         // Если пользователь успешно зарегистрирован
//         const token = sign(user.user, SECRET_KEY, { expiresIn: "1d" })
//         // сохраняет токен в куках у пользователя
//         res.cookie("token", token)
//         // Записываем пользователя в куки, преобразовав объект пользователя в JSON строку
//         // res.cookie("user", JSON.stringify(user.user))
//         // Отправляем статус 200 "ok" пользователю
//         return res.sendStatus(200)
//     }
//     // Если произошла какая-то ошибка
//     res.status(500).send("Error")
// }

// function authUser(req: Request, res: Response){
//   try {
//     console.log(req.body);
//     // Оператор ! используется для проверки истинности значения.
//     // Проверки и логика аутентификации: если email или password не предоставлены
//     // Если значение истинно (например, непустая строка), ! вернет false.
//     // Если значение ложно (например, undefined, null или пустая строка ""), ! вернет true.
//     // Оператор || возвращает true, если хотя бы одно из условий истинно.
//     if (!req.body.email || !req.body.password) {
//       res.status(400).send('Email и пароль обязательны')
//     }
//     const { email, password } = req.body;
//     // Отправляем данные в сервис
//     const user = UserService.authenticate(email, password); 

//     if (user) {
//       // Метод cookie отправляет специальный заголовок Set-Cookie
//       // Если пользователь найден, устанавливаем куки с объектом пользователя
//       res.cookie('user', JSON.stringify(user), { httpOnly: true });
//       res.cookie("token", "mysecrettoken")
//       res.sendStatus(200); 
//     } else {
//       // Неавторизованный user
//       res.sendStatus(401); 
//     }
//   } catch (error) {
//       console.error(error)
//       res.status(500).send('ошибка сервера')
//   }
// }