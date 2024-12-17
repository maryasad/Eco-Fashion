class EcoBot {
    constructor() {
        this.responses = {
            greetings: [
                "Hello! How can I help you with textile recycling today?",
                "Hi there! Got questions about sustainable fashion?",
                "Welcome! I'm here to help you make eco-friendly fashion choices!"
            ],
            recycling_info: {
                how_to: "To recycle textiles: 1) Clean the items 2) Sort by material type 3) Find local recycling centers or donation points 4) Consider upcycling for creative reuse!",
                benefits: "Textile recycling reduces landfill waste, saves water and energy, reduces CO2 emissions, and creates job opportunities in the recycling industry.",
                materials: "Most textiles can be recycled, including: cotton, wool, polyester, nylon, and blended fabrics. Even damaged items can be recycled into new materials!"
            },
            sustainable_fashion: {
                tips: "Choose quality over quantity, buy second-hand, support sustainable brands, care for your clothes properly, and repair instead of replace when possible.",
                fast_fashion: "Fast fashion has a huge environmental impact. It leads to excessive waste, high water consumption, and poor working conditions.",
                alternatives: "Try thrift shopping, clothes swapping, renting for special occasions, or investing in timeless pieces from sustainable brands."
            },
            default: "I'm not sure about that, but I'd be happy to tell you about textile recycling, sustainable fashion, or how you can make a difference!"
        };

        this.init();
    }

    init() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendMessage');
        this.chatMinimize = document.getElementById('chatMinimize');
        this.chatNotification = document.getElementById('chatNotification');

        this.setupEventListeners();
        this.setupQuickReplies();
    }

    setupEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatMinimize.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Hide notification when chat is opened
        this.chatToggle.addEventListener('click', () => {
            this.chatNotification.style.display = 'none';
        });
    }

    setupQuickReplies() {
        document.querySelectorAll('.quick-reply-btn').forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent;
                this.addMessage(question, 'user');
                this.showTypingIndicator();
                
                setTimeout(() => {
                    this.removeTypingIndicator();
                    const response = this.generateResponse(question);
                    this.addMessage(response, 'bot');
                }, 1000);
            });
        });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-message';
        typingDiv.innerHTML = `
            <img src="/images/eco-bot-avatar.svg" alt="EcoBot" class="message-avatar">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingMessage = this.chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    toggleChat() {
        this.chatContainer.classList.toggle('active');
        if (this.chatContainer.classList.contains('active')) {
            this.userInput.focus();
        }
    }

    handleUserInput() {
        const message = this.userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Get and display bot response with delay
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <img src="/images/eco-bot-avatar.svg" alt="EcoBot" class="message-avatar">
                <div class="message-content">
                    ${message}
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${message}
                </div>
            `;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    generateResponse(message) {
        message = message.toLowerCase();

        // Check for greetings
        if (message.match(/^(hi|hello|hey|greetings)/)) {
            return this.getRandomResponse(this.responses.greetings);
        }

        // Check for recycling questions
        if (message.includes('how') && message.includes('recycle')) {
            return this.responses.recycling_info.how_to;
        }
        if (message.includes('benefits') && message.includes('recycling')) {
            return this.responses.recycling_info.benefits;
        }
        if (message.includes('materials') || message.includes('what can')) {
            return this.responses.recycling_info.materials;
        }

        // Check for sustainable fashion questions
        if (message.includes('sustainable') || message.includes('eco friendly')) {
            return this.responses.sustainable_fashion.tips;
        }
        if (message.includes('fast fashion')) {
            return this.responses.sustainable_fashion.fast_fashion;
        }
        if (message.includes('alternative') || message.includes('instead')) {
            return this.responses.sustainable_fashion.alternatives;
        }

        // Default response
        return this.responses.default;
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EcoBot();
});
