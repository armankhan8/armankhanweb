// Chat Widget functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatContainer = document.querySelector('.chat-widget__container');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');

    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, true);
        chatInput.value = '';

        try {
            // Show typing indicator
            showTypingIndicator();

            // Make API call to OpenAI (you'll need to implement this)
            const response = await sendToGPT(message);

            // Remove typing indicator and add bot response
            removeTypingIndicator();
            addMessage(response, false);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again.', false);
        }
    });

    // Add message to chat
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'chat-message--user' : ''}`;
        
        messageDiv.innerHTML = `
            <i class='bx ${isUser ? 'bx-user' : 'bx-bot'}'></i>
            <div class="chat-message__content">${message}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <i class='bx bx-bot'></i>
            <div class="chat-message__content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Send message to Gemini API
    async function sendToGPT(message) {
        const API_KEY = 'AIzaSyCxXRBlbLYkQlgYe8n106jP17hTzmChSGg';
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a helpful assistant on Arman Khan's portfolio website. You can provide information about Arman's education, skills, projects, and experience. Keep responses concise and friendly.

User question: ${message}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 150,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('API Error Response:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Unexpected API response format');
            }
        } catch (error) {
            console.error('Detailed Error:', error);
            throw error;
        }
    }
}); 