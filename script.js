document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('questionInput');
    const submitBtn = document.getElementById('submitBtn');
    const chatWindow = document.getElementById('chatWindow');

    // Function to add a message bubble to the chat
    function addMessage(message, isBot = false) {
        const messageBubble = document.createElement('div');
        messageBubble.className = `chat-bubble ${isBot ? 'bot' : 'user'}`;
        messageBubble.textContent = message;
        chatWindow.appendChild(messageBubble);

        // Auto-scroll to the latest message
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageBubble; // Return the message bubble for typing effect
    }

    // Function to simulate typing effect
    function typeMessage(message, messageBubble) {
        let index = 0;
        messageBubble.textContent = ""; // Start with an empty bubble

        const typingInterval = setInterval(() => {
            messageBubble.textContent += message[index];
            index++;
            if (index === message.length) {
                clearInterval(typingInterval); // Stop typing once the message is fully displayed
            }
        }, 50); // Delay between characters (adjust for speed)
    }

    // Function to submit a question
    async function submitQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;

        // Add user message to chat (this appears immediately)
        addMessage(question);

        // Clear input field
        questionInput.value = '';

        // Simulate loading (show bot typing)
        const loadingBubble = addMessage('Loading...', true);

        try {
            // Send request to API
            const response = await fetch('https://ai-powered-chatbot-rt9q.onrender.com/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, similarity_threshold: 0.2 }),
            });

            // Remove loading message after response is received
            if (loadingBubble) {
                chatWindow.removeChild(loadingBubble);
            }

            if (response.ok) {
                const data = await response.json();
                const answer = data.answer || 'Sorry, I could not find an answer.';
                const botMessageBubble = addMessage(answer, true); // Add the bot's response to the chat window
                typeMessage(answer, botMessageBubble); // Type the message slowly in the bubble
            } else {
                addMessage('Error: Unable to fetch the answer. Please try again later.', true);
            }
        } catch (error) {
            console.error(error);
            addMessage('Error: Unable to connect to the server.', true);
        }
    }

    // Event listeners
    submitBtn.addEventListener('click', submitQuestion);
    questionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitQuestion();
        }
    });
});
