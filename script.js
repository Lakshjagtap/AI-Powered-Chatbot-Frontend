document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('questionInput');
    const submitBtn = document.getElementById('submitBtn');
    const chatWindow = document.getElementById('chatWindow');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.textContent = 'Bot is typing...';

    // Hardcoded question-answer data
    const qaData = [
        { question: "Hello", answer: "Hi there! How can I assist you today? You can ask about orders, products, returns, shipping, account, or speak to a human agent. Just type your question!" },
        { question: "Hi", answer: "Hello! What can I help you with today? Feel free to ask about orders, products, or anything else, and I'll guide you through it!" },
        { question: "Hii", answer: "Hello! What can I help you with today? Feel free to ask about orders, products, or anything else, and I'll guide you through it!" },
        { question: "Thanks", answer: "You're welcome! Let me know if you need anything else, or if you'd like help with something specific." },
        { question: "Goodbye", answer: "Goodbye! Feel free to reach out anytime if you have more questions. Have a great day!" },
        { question: "Bye", answer: "Take care! Don't hesitate to reach out if you need further assistance. See you soon!" },
        { question: "Help", answer: "I'm here to help! What do you need assistance with? You can ask about your order, shipping, refunds, or account issues. Just let me know!" },
        { question: "Order", answer: "You can track your order, change it, or cancel it. Please provide your order number, and I'll help you with the next steps!" },
        { question: "Shipping", answer: "We offer various shipping options. To help you further, could you provide your location or ask about shipping rates?" },
        { question: "Returns", answer: "You can return most items within 30 days. To start a return, visit our 'Returns' page or type 'Return' and follow the instructions." },
        { question: "Discount", answer: "We offer discounts throughout the year. Use code SAVE20 for 20% off selected items. Would you like help applying it at checkout?" },
        { question: "Payment", answer: "We accept credit cards, PayPal, and other secure payment methods. You can choose your preferred method at checkout. Let me know if you need help!" },
        { question: "Product", answer: "We sell a variety of products. Can you specify the product you're interested in? I'll help you find it!" },
        { question: "Price", answer: "You can check the price of any product on its product page. If you need help finding a product, let me know!" },
        { question: "Store", answer: "We only operate online, but we ship worldwide. Would you like help browsing products or finding something specific?" },
        { question: "Gift", answer: "We don't offer gift wrapping currently, but you can order quickly for a special occasion. Let me know if you'd like assistance with that!" },
        { question: "Status", answer: "Could you clarify what status you're referring to? Is it about an order, a return, or something else? Let me know so I can assist you further!" },
        { question: "Return", answer: "To return an item, please visit our 'Returns' page and follow the instructions. Let me know if you need assistance with the return process!" },
        { question: "Cancel", answer: "If your order hasn’t been processed yet, we can cancel it. Please provide your order number, and I'll assist you in canceling the order." },
        { question: "Account", answer: "You can manage your account by logging in. If you need help resetting your password or updating account details, let me know!" },
        { question: "Login", answer: "You can log in to your account from the login page. If you forgot your password, you can reset it by clicking 'Forgot Password'." },
        { question: "Contact", answer: "You can reach our support team through live chat or call us at 1-800-123-4567. How can I assist you further?" },
        { question: "Track", answer: "To track your order, you can enter your tracking number on our 'Track Order' page. Let me know if you need the tracking number or help finding it!" },
        { question: "Support", answer: "Our support team is available 24/7! Let me know what you need assistance with, and I'll guide you to the right team or resources." },
        { question: "Warranty", answer: "We offer warranties on select products. To learn about the warranty for your product, please visit the product's page or contact support for details." },
        { question: "Refund", answer: "Refunds are processed within 7-10 business days after we receive the returned item. You can check your refund status on the 'Order Status' page." },
        { question: "Exchange", answer: "Exchanges are possible for certain items. Please visit our 'Exchange' page or contact support to process an exchange for your item." },
        { question: "Availability", answer: "You can check product availability on the product page. If you'd like to know about stock availability or get a recommendation, let me know!" },
        { question: "Size", answer: "Check the size chart available on the product page for clothing or shoes. If you need assistance with sizing, I’m happy to help you find your size!" },
        { question: "Order ID", answer: "Your Order ID can be found in the confirmation email. Please provide it, and I’ll help you with your order status or tracking!" },
        { question: "Tracking", answer: "Tracking information is sent when your order ships. If you haven't received your tracking, please share your Order ID, and I'll get the details for you." },
        { question: "Confirmation", answer: "You should have received a confirmation email once your order was placed. Please check your inbox or let me know if you'd like us to resend it!" },
        { question: "Terms", answer: "You can review our terms and conditions on our website. Let me know if you have any specific questions about our policies." },
        { question: "Policy", answer: "Our return, shipping, and privacy policies are listed on our website. Please let me know if you have questions about a specific policy!" },
        { question: "Offer", answer: "We often have offers and promotions. You can subscribe to our newsletter for the latest deals, or I can share some active discounts with you!" },
        { question: "Order number", answer: "Your order number is in the confirmation email. If you'd like, provide it, and I'll help you track or check the status of your order!" },
        { question: "Delivery", answer: "We offer different delivery options. Please provide your location, and I'll help you choose the best option for your delivery needs!" },
        { question: "Notification", answer: "You’ll receive notifications regarding your order status, shipping, and more. If you haven’t received one, let me know, and I can check for you." },
        { question: "Address", answer: "You can update your shipping address in your account settings. If your order hasn't shipped yet, I can help you change it!" },
        { question: "FAQ", answer: "You can find answers to frequently asked questions on our FAQ page. If you have a specific question, feel free to ask me!" },
        { question: "Update", answer: "If you want to update your order or shipping details, please contact customer support. Let me know if you'd like to start the process!" },
        { question: "Shipping address", answer: "You can update your shipping address in your account settings, or contact us directly to make changes before shipment!" },
        { question: "Order details", answer: "You can view your order details in your account or in your confirmation email. Let me know if you'd like me to guide you through it!" },
        { question: "How are you?", answer: "I’m doing well, thank you for asking! How can I assist you today? Feel free to ask about our services, products, or support." },
        { question: "What are your customer support hours?", answer: "Our support team is available 24/7 to assist you. What do you need help with?" },
        { question: "Do you have a physical store?", answer: "We operate online only, but offer fast shipping worldwide. Let me know if you need assistance finding something." },
        { question: "Can I speak to a human agent?", answer: "Sure! You can reach out to our live chat or call 1-800-123-4567 to speak with a representative." },
    
        // Account & Orders
        { question: "How can I reset my password?", answer: "You can reset your password by visiting the 'Forgot Password' section on the login page. Need help with that?" },
        { question: "Where is my order?", answer: "You can track your order through our website or by checking the tracking number sent to your email. Let me know if you need further assistance!" },
        { question: "Can I change my shipping address?", answer: "You can update your shipping address by contacting customer support. Once an order is shipped, we can’t change the address." },
        { question: "How can I cancel my order?", answer: "If your order hasn’t been shipped yet, we can cancel it. Please contact customer service immediately for assistance." },
        { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and other secure payment methods. You can select your preferred option at checkout." },
    
        // Product Inquiries
        { question: "Do you have discounts?", answer: "Yes! We offer discounts throughout the year. Use code SAVE20 to get 20% off select items." },
        { question: "What products do you sell?", answer: "We offer a variety of products, including electronics, home goods, apparel, and more. What are you looking for?" },
        { question: "Can I get a refund?", answer: "Yes, we offer refunds within 30 days of purchase. Please check our return policy for more details or contact support." },
        { question: "Is this product in stock?", answer: "You can check the product availability on the product page, or let me know the item you're interested in!" },
        { question: "What are your best-selling products?", answer: "Some of our best-sellers include [insert popular products]. Would you like to check out any of them?" },
    
        // Shipping
        { question: "How long does shipping take?", answer: "Shipping typically takes 3-7 business days, depending on your location. You can check shipping details during checkout." },
        { question: "Do you ship internationally?", answer: "Yes, we offer international shipping. We ship to most countries worldwide. Let me know your location, and I’ll check shipping options." },
        { question: "What shipping options do you offer?", answer: "We offer standard, expedited, and express shipping. You can choose your preferred option during checkout." },
        { question: "Can I change my shipping method?", answer: "Once your order is placed, we cannot change the shipping method. However, if your order hasn’t shipped yet, we might be able to assist you." },
    
        // Returns & Refunds
        { question: "How do I return an item?", answer: "You can return items within 30 days of purchase. Please visit our Returns page for instructions or contact support for further help." },
        { question: "What is your return policy?", answer: "Our return policy allows returns within 30 days for most items. Please check the item’s eligibility or contact customer support." },
        { question: "When will I get my refund?", answer: "Refunds are processed within 7-10 business days after we receive the returned item. You will be notified via email." },
        { question: "Can I exchange an item?", answer: "Exchanges are possible for certain items. Please contact support for further assistance with exchanges." },
    
        // Discounts & Promotions
        { question: "Do you have any discount codes?", answer: "Yes! Use code SAVE20 to get 20% off selected items. Would you like help applying it?" },
        { question: "How can I apply a promo code?", answer: "Simply enter the promo code during checkout in the discount code box. Need help with this?" },
        { question: "Are there any seasonal sales?", answer: "We have sales during major holidays and special events throughout the year. Stay tuned for our next big sale!" },
        { question: "How do I know if an item is on sale?", answer: "Items on sale are clearly marked with a discount percentage or 'Sale' label on the product page." },
    
        // More Questions (20 additional questions)
        { question: "Can I upgrade my order to expedited shipping?", answer: "Yes, you can upgrade to expedited shipping if your order hasn’t shipped yet. Contact customer support for assistance." },
        { question: "What should I do if my item is defective?", answer: "If your item is defective, please contact us immediately so we can assist you with a replacement or refund." },
        { question: "Can I pay with a gift card?", answer: "Yes, we accept gift cards for payment. You can enter the card details at checkout." },
        { question: "What if I missed the delivery of my package?", answer: "If you missed the delivery, please check with the carrier for re-delivery options or visit the nearest local post office." },
        { question: "Do you offer gift wrapping?", answer: "At the moment, we do not offer gift wrapping services. Let me know if you need any other assistance." },
        { question: "Can I schedule my delivery?", answer: "We do not currently offer delivery scheduling, but you can track your order and choose from available shipping options." },
        { question: "Can I change my order after it’s placed?", answer: "Once your order is placed, we cannot change it. However, if it hasn't been processed yet, contact us immediately." },
        { question: "How do I get notified about new products?", answer: "You can sign up for our newsletter to receive updates about new products and promotions." },
        { question: "How can I contact you by email?", answer: "You can contact us at support@ourstore.com for any inquiries." },
        { question: "What do I do if I don't receive my confirmation email?", answer: "Please check your spam folder. If you still don’t find it, contact us and we’ll resend the confirmation." },
        { question: "How do I unsubscribe from your emails?", answer: "You can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails." },
        { question: "How do I change my billing address?", answer: "You can update your billing address in your account settings. If you need help, feel free to contact support." },
        { question: "What’s your privacy policy?", answer: "You can read our privacy policy at the bottom of our website. Let me know if you have any questions." },
        { question: "Do you offer price matching?", answer: "We don’t currently offer price matching, but we often have discounts. Please check our promotions page." },
        { question: "How can I track my return?", answer: "Once we process your return, you’ll receive an email with tracking information." },
        { question: "Can I use multiple promo codes on one order?", answer: "Promo codes can only be used one at a time. If you have multiple codes, choose the best one at checkout." },
        { question: "How do I change the payment method on my order?", answer: "You can change the payment method before your order is processed. Contact support for assistance." },
        { question: "Is it safe to shop on your website?", answer: "Yes, we use the latest encryption technology to keep your data secure. Shop with confidence!" },
        { question: "Can I get a price adjustment?", answer: "Price adjustments can only be made if an item goes on sale within 7 days of your purchase. Contact support for help." },
        { question: "Do you offer a loyalty program?", answer: "We’re working on a loyalty program! Stay tuned for updates or sign up for our newsletter to learn more." }
    ];

    // Function to find answer from hardcoded data
// Function to find answer from hardcoded data
function findAnswer(question) {
    // Convert question to lowercase for case-insensitive matching
    const normalizedQuestion = question.toLowerCase();

    // Check for matches in a more flexible way
    const entry = qaData.find(item => {
        // Compare both the question and the normalized question to handle plurals and variations
        return normalizedQuestion.includes(item.question.toLowerCase());
    });

    return entry ? entry.answer : "Sorry, I couldn't find an answer to that. Please ask something else or contact support.";
}


    // Function to add a message bubble
    function addMessage(message, isBot = false) {
        const messageBubble = document.createElement('div');
        messageBubble.className = `chat-bubble ${isBot ? 'bot' : 'user'}`;
        messageBubble.textContent = message;
        chatWindow.appendChild(messageBubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to simulate typing effect
    function typeEffect(message, callback) {
        let i = 0;
        const speed = 50; // Speed of typing (milliseconds)
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-bubble bot';
        chatWindow.appendChild(botMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        function typeNextChar() {
            if (i < message.length) {
                botMessage.textContent += message.charAt(i);
                i++;
                setTimeout(typeNextChar, speed);
            } else {
                callback(); // Call callback function when typing is finished
            }
        }

        typeNextChar();
    }

    // Function to submit question
    function submitQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;

        addMessage(question); // Display user's message
        questionInput.value = ''; // Clear input field

        setTimeout(() => {
            const answer = findAnswer(question);
            typeEffect(answer, () => {}); // Start typing effect for the bot's response
        }, 500); // Simulate some delay before bot responds
    }

    // Event listeners
    submitBtn.addEventListener('click', submitQuestion);
    questionInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            submitQuestion();
        }
    });
});