
// const socket =io('http://localhost:8000');
const socket = io('http://localhost:8000',{transports:['websocket']})

const form= document.getElementById('send-container')
const messageInput = document.getElementById('msgInp')
const messageContainer = document.querySelector('.container')

const append= (message,position)=>{
const messageElement = document.createElement('div')
messageElement.innerText =message
messageElement.classList.add('msg')
messageElement.classList.add(position)
messageContainer.append(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message=messageInput.value;
    append(`you: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value= ''

})
const uName = prompt('enter your name')
socket.emit('new-user-joined',uName)
socket.on('user-joined',uName=>{
append(`${uName} joined the chat` ,'right')
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`)
})