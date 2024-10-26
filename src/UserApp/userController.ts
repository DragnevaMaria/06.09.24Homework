import express, { Express, Request, Response } from 'express'
function login(req: Request, res: Response){
  res.render('login')
}
function authUser(req: Request, res: Response){
  try {
    console.log(req.body);
    // Оператор ! используется для проверки истинности значения.
    // Проверки и логика аутентификации: если email или password не предоставлены
    // Если значение истинно (например, непустая строка), ! вернет false.
    // Если значение ложно (например, undefined, null или пустая строка ""), ! вернет true.
    // Оператор || возвращает true, если хотя бы одно из условий истинно.
    if (!req.body.email || !req.body.password) {
          // res.status(400).send('Email and password are required.');
      } else {
        // Метод cookie отправляет специальный заголовок Set-Cookie
        // Устанавливаем cookie с email пользователя
        // res.cookie('user', req.body.email)
        // Возвращаем статус 200
        // res.sendStatus(200)
    }
  } catch (error) {
      console.error(error)
      // res.status(500).send('Internal Server Error')
  }
}

const userController = {
  login: login,
  authUser: authUser
}
export default userController




// function authUser(req: Request, res: Response){
//   console.log(req.body)
//   // метод cookie отправляет специальный заголовок Set-Cookie
//   res.cookie('user', req.body.email)
//   res.sendStatus(200)
// }