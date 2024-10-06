const button = document.querySelector('#button')
const p = document.querySelector('.p')

button.addEventListener('click', () => {
    fetch('/post/create', {
        method: 'POST',
        body: JSON.stringify({
            name: 'Post 3',
            message: "long message",
            time: "02.10.2024  04:54",
            author: 'Author 3'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    p.classList.add("p_on")
})
