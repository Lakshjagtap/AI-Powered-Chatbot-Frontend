document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('questionInput');
    const submitBtn = document.getElementById('submitBtn');
    const answerBox = document.getElementById('answerBox');

    // Function to submit the question
    async function submitQuestion() {
        const question = questionInput.value.trim();

        // Check if input is empty
        if (!question) {
            displayAnswer('Please enter a question!', true);
            return;
        }

        // Show loading indicator
        displayAnswer('Loading...', true);

        try {
            const response = await fetch('https://ai-powered-chatbot-mffj.onrender.com/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    similarity_threshold: 0.2
                })
            });

            // If response is successful
            if (response.ok) {
                const data = await response.json();

                if (data.status === 'success') {
                    displayAnswer(`Answer: ${data.answer}`);
                } else if (data.status === 'warning') {
                    displayAnswer(`Warning: ${data.message}`, true);
                }
            } else {
                // Handle non-OK response (e.g., 4xx, 5xx)
                const data = await response.json();
                displayAnswer(`Error: ${data.message || 'Unable to fetch answer. Please try again later.'}`, true);
            }
        } catch (error) {
            // Handle network or other errors
            displayAnswer('Error: Unable to connect to the server.', true);
        }
    }

    // Function to display the answer
    function displayAnswer(message, isError = false) {
        answerBox.style.display = 'block';
        answerBox.style.backgroundColor = isError ? '#ffe6e6' : '#e6f0ff';
        answerBox.style.borderColor = isError ? '#ff4d4d' : '#2575fc';
        answerBox.innerText = message;
    }

    // Event listener for the submit button
    submitBtn.addEventListener('click', submitQuestion);

    // Optional: Submit on Enter key
    questionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitQuestion();
        }
    });
});
