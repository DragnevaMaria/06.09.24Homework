
form.addEventListener('submit', (event)=>{
    // предотвращает перезагрузку страницы при отправке формы
    event.preventDefault()
    // fetch — это функция, которая позволяет делать HTTP-запросы
    // С помощью fetch отправляется POST-запрос на указанный URL с 
    // данными формы в формате JSON.
    fetch('', {
        method: 'POST',
        // Этот параметр задает тело запроса. 
        // Мы используем JSON.stringify() для преобразования 
        // JavaScript-объекта в строку формата JSON
        body: JSON.stringify({
            // Значения email.value и password.value — это данные, 
            // введенные пользователем в соответствующие поля формы. 
            // Эти значения получаются из элементов ввода (input), 
            // которые были определены в коде html.
            username: username.value,
            email: email.value,
            password: password.value
        }),
        // Этот объект определяет заголовки HTTP-запроса. В данном 
        // случае мы указываем, что тип содержимого 
        // (Content-Type) — это JSON. Это необходимо, чтобы сервер знал, 
        // что данные, которые он получает, находятся в формате JSON и 
        // мог правильно их обработать.
        headers: {
            'Content-Type': 'application/json'
        }
    })
})