import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { SECRET_KEY } from "../config/token"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies
    const user = req.cookies.user
    // Проверка на наличие объекта user и его полей
    if (user && user.email && user.name && user.role) {
        console.log("Авторизация успешна:", user) 
    } else {
        res.sendStatus(401) 
    }
     // если в cookies нет ключа token - вернется undefined во избежание ошибки
    if (cookies.token) {
        const token = verify(cookies.token, SECRET_KEY)
        // console.log(token)
        console.log("Авторизированный юзер", token)
        next()
    } else {
        res.sendStatus(403)
    }
}
