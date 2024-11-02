import userRepository from "./userRepository"
// type email = 

interface IAuthLoginOk{
  status:"ok",
  user: {
      id: number,
      username: string,
      email: string,
      password: string,
  }
}
interface IAuthLoginError{
    status:"error",
    message: string,
}

interface IAuthRegistOk {
    status: "ok";
    user: {
        id: number;
        username: string;
        email: string;
        // роль пользователя
        role: string; 
    };
}
interface IAuthRegistError {
  status: "error";
  message: string;
}
// authLogin вызывает findUserByEmail, чтобы найти пользователя по email 
// Если пользователь не найден выдает ошибку
async function authLogin(password:string, email: string): Promise<IAuthLoginOk | IAuthLoginError> {
  const user = await userRepository.findUserByEmail(email)
  // Проверка, есть ли пользователь с таким email
  if (!user) {
      return {status:"error", message: "user not found"}
  }
  // Проверка пароля
  if (user.password != password) {
      return {status:"error", message: "passwords are not similar"}
  }

  console.log(user)
  console.log(typeof user)
  // return {
  //   status: "ok",
  //   user: {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email
  //   }
  // }
  return {status : "ok" , user: user}
}

async function authRegist(username: string, email: string, password: string): Promise<IAuthRegistOk | IAuthRegistError> {
  // Проверяем, существует ли пользователь с таким email
  const user = await userRepository.findUserByEmail(email)
  // Проверка, есть ли пользователь с таким email
  if (user) {
      return { status: "error", message: "user found(exists)"}
  }
  // Если пользователь не существует, создаём нового пользователя
  const newUserData = {
      username,
      email,
      password, // пока нету хэширования
      role: "user" 
  };
  // Создаем нового пользователя
  // const newUser = await userRepository.createUser({ username, email, password, role: "user" })
  const newUser = await userRepository.createUser(newUserData)
  // Проверка, что новый пользователь успешно создан
  if (!newUser) {
    return { status: "error", message: "Failed to create user"}
  }
  // Возвращаем нового пользователя без пароля, но с ролью
  return {
    status: "ok",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role 
    }
  }
}

const userService = {
  authLogin: authLogin,
  authRegist
}

export default userService

// // Создаем объект UserService
// const UserService = {
//   // Функция для аутентификации пользователя
//   async authenticate(email: string, password: string) {
//     // Находим пользователя по email через репозиторий
//     const user = await UserRepository.findUserByEmail(email)

//     if (user === 'Not Found') {
//       return null; // Возвращаем null, если пользователь не найден
//     }
//     // Проверяем совпадение пароля
//     if (user.password === password) {
//       // Создаем новый объект пользователя без пароля
//       // Деструктурируем, убирая пароль
//       const { password: _, ...userWithoutPassword } = user
//       return userWithoutPassword; // Возвращаем объект пользователя без пароля
//     }
//     // Возвращаем null, если пароли не совпадают
//     return null; 
//   }
// }
