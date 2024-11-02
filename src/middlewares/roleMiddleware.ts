import { NextFunction, Request, Response } from "express"

export function roleMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = req.cookies.user

    // Проверяем, существует ли объект user и его роль
    if (user && user.role === 'admin') {
        console.log("Вам дана роль admin")
        next() 
    } else {
         res.sendStatus(403) 
    }
}
