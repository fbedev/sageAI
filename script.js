const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const developerLabel = document.getElementById('developerLabel');
const modelLabel = document.getElementById('modelLabel');
const infoModal = document.getElementById('infoModal');
const modelDropdown = document.getElementById('modelDropdown');
const setModelButton = document.getElementById('setModelButton');
const errorMessage = document.querySelector('.error-message');

function addMessage(message, isUser) {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message';
    if (isUser) {
        chatMessage.classList.add('user-message');
    }
    chatMessage.innerText = message;
    chatbox.appendChild(chatMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage('You: ' + message, true);
    userInput.value = '';

    // Send the message to the backend API using Fetch
    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const response = "AI Bot: " + data.message;
        addMessage(response, false);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage("AI Bot: Sorry, there was an error while processing your request.", false);
    });
}

function showDeveloperInfo() {
    addMessage('開發者：道明403-40楊閔竣', false);
}

function switchLanguage() {
    // Logic to switch the language goes here
    // For this example, let's simply add a message to the chatbox indicating that the Chinese version is not available
    addMessage("Not available 未推出", false);
}

function showInfoModal() {
    infoModal.style.display = 'block';
}

function closeInfoModal() {
    infoModal.style.display = 'none';
}

function confirmInfo() {
    closeInfoModal();
}

function setModel() {
    const selectedModel = modelDropdown.value;
    if (selectedModel !== 'fbe-gp2') {
        showError('Model not available. Please choose "fbe-gp2".');
    } else {
        closeInfoModal();
        modelLabel.textContent = 'AI model:' + selectedModel;
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = 'red';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

chatbox.addEventListener('click', () => {
    userInput.focus();
});

userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

sendButton.addEventListener('click', sendMessage);
developerLabel.addEventListener('click', showDeveloperInfo);

// Call the showInfoModal function when the page loads
window.onload = showInfoModal;

setModelButton.addEventListener('click', setModel);
