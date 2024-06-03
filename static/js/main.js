console.log('Hello from main.js!')


const socket = io()

///////////////////////////////////////////////////////
// Testing that the socket can send and receive data //
///////////////////////////////////////////////////////

// socket.send('Hello from the client side')

// socket.send({"name": "Brian"})

// socket.on('message', (data) => {
//     console.log("The client recevied this message:", data)
// })

// socket.emit('custom_test_event', {"test": 123})

// socket.on('another_event', (data) => {
//     console.log('Another event received:', data)
// })


socket.on('message', (msg) => {
    // Create a new li element
    if (typeof msg == "string"){
        let msgElement = document.createElement('li')
        msgElement.className = 'list-group-item'
        msgElement.innerHTML = msg
        // Get the message ul and append the new message
        let messages = document.getElementById('messages')
        messages.append(msgElement)
    }
    else{
    let msgElementB = document.createElement('li')
    msgElementB.className = 'list-group-item'
    msgElementB.innerHTML = msg[0]
    // Get the message ul and append the new message
    let messagesB = document.getElementById('messagesB')
    messagesB.append(msgElementB)
    }
})

socket.on('initial_messages', (messages) => {
    // Get the message ul and append the initial messages
    let messageList = document.getElementById('messages')
    messageList.innerHTML = '';
    messages.forEach( msg => {
        let msgElement = document.createElement('li')
        msgElement.className = 'list-group-item'
        msgElement.innerHTML = msg
        messageList.append(msgElement)
    })
})


// Create a loggedInUser

let loggedInUser = null;

const usernameForm = document.getElementById('username-form');

// Add submit event listener to username form to set the loggedInUser
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get the username from the input value
    let newUser = e.target.username.value
    // If the input is blank throw a warning in the console
    if (!newUser){
        console.warn('Username cannot be blank')
        return
    }
    // Set the global(ish) loggedInUser to the newUser
    loggedInUser = newUser
    // Add the username to the Welcome h1
    welcome = document.getElementById('welcome-banner')
    welcome.innerText = 'Welcome to the Coding Temple Chat, ' + loggedInUser +  "!"
    // Hide the username row
    usernameRow = document.getElementById('usernameRow')
    usernameRow.style.display = 'none';
    // Show the messages row
    messageRow = document.getElementById('messageRow')
    messageRow.style.display = 'block'
    messageRow = document.getElementById('messageRowB')
    messageRow.style.display = 'none'
    messageRow = document.getElementById('switchRow')
    messageRow.style.display = 'block'
})


// Get the send chat form and add event listener to emit to send_chat_message
const chatForm = document.getElementById('send-chat')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = e.target.message.value
    let messageData = {
        message: message,
        username: loggedInUser
    }
    socket.emit('send_chat_message', messageData)
    e.target.message.value = '';
})

const roomForm = document.getElementById('switchRow')

roomForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // messageRow = document.getElementById('messageRow')
    // messageRow.style.display = 'none'
    messageRow = document.getElementById('messageRowB')
    messageRow.style.display = 'block'
    messageRow = document.getElementById('switchRow')
    messageRow.style.display = 'none'
    welcome = document.getElementById('welcome-banner')
    welcome.innerText = 'Welcome to Room B, ' + loggedInUser +  "!"
    
    let messageData = {
        message: "entered the chat room",
        username: loggedInUser
    }

    socket.emit('send_chat_messageB', messageData)

})


const chatFormB = document.getElementById('send-chatB')

chatFormB.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = e.target.message.value
    let messageData = {
        message: message,
        username: loggedInUser
    }
    socket.emit('send_chat_messageB', messageData)
    e.target.message.value = '';
})


// socket.on('message', (msg) => {
//     // Create a new li element
//     let msgElement = document.createElement('li')
//     msgElement.className = 'list-group-item'
//     msgElement.innerHTML = msg[0]
//     // Get the message ul and append the new message
//     let messages = document.getElementById('messagesB')
//     messages.append(msgElement)
// })
