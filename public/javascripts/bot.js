

class ChatBot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;

        // DOM elements
        this.chatToggle = document.getElementById('chatToggle');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');

        // Bot responses
        this.responses = {
            greetings: [
                "Hello! How can I assist you today?",
                "Hi there! What can I help you with?",
                "Welcome! How may I help you?",
                "Greetings! What would you like to know?"
            ],
            help: [
                "I'm here to help! You can ask me about our services, pricing, or any questions you might have.",
                "I can assist you with product information, support, or general inquiries. What would you like to know?",
                "Feel free to ask me anything about our website or services!"
            ],
            services: [
                "We offer a wide range of services including web development, design, and digital marketing. Would you like to know more about any specific service?",
                "Our main services include custom web solutions, e-commerce development, and SEO optimization. What interests you most?"
            ],
            pricing: [
                "Our pricing varies based on your specific needs. Would you like to schedule a consultation to discuss your project?",
                "We offer flexible pricing options. I can connect you with our sales team for a detailed quote!"
            ],
            contact: [
                "You can reach us at contact@example.com or call us at +1-234-567-8900. We're available Monday to Friday, 9 AM to 6 PM.",
                "Feel free to email us at support@example.com or use this chat for immediate assistance!"
            ],
            default: [
                "That's an interesting question! Let me connect you with a human agent who can provide more detailed information.",
                "I'd be happy to help! Could you please provide more details about what you're looking for?",
                "Thanks for your question! For the best assistance, I recommend contacting our support team directly.",
                "I'm still learning! For complex inquiries, our human support team would be better equipped to help you."
            ]
        };

        this.init();
    }

    init() {
        // Event listeners
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-focus input when chat opens
        this.chatInput.addEventListener('focus', () => {
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.chatWindow.classList.add('open');
            this.chatToggle.classList.add('active');
            setTimeout(() => {
                this.chatInput.focus();
            }, 300);
        } else {
            this.chatWindow.classList.remove('open');
            this.chatToggle.classList.remove('active');
        }
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator and generate bot response
        this.showTypingIndicator();


        this.generateResponse(message);

    }

    addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        this.hideTypingIndicator();
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    async generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let responses = await fetch("/genai", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        responses = await responses.json();
        this.addMessage(responses.reply, 'bot');
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the chatbot
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

async function fetchTranslations() {
    try {
        const response = await fetch('/api/translations');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching translations:', error);
        return null;
    }
}