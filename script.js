// script.js

// Mobile hamburger menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Print resume helper
const printButton = document.getElementById('printResume');
if (printButton) {
  printButton.addEventListener('click', () => {
    window.print();
  });
}

// Contact form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formData = new FormData(contactForm);

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      formMessage.classList.remove('error', 'success');

      if (result.success) {
        formMessage.classList.add('success');
        formMessage.textContent = result.message;
        contactForm.reset();
      } else {
        formMessage.classList.add('error');
        formMessage.textContent = result.message;
      }
    } catch (error) {
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      formMessage.textContent = 'Network error. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// Simple fade animation on scroll

const cards = document.querySelectorAll(
  '.project-card, .about-box, .resume-card'
);

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

});

cards.forEach(card => {
  card.classList.add('hidden');
  observer.observe(card);
});

// AI Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Get the correct API endpoint based on current page
function getChatbotEndpoint() {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/Sections/')) {
    return '../backend/chatbot.php';
  }
  return './backend/chatbot.php';
}

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
  if (chatbotContainer.classList.contains('active')) {
    chatbotInput.focus();
  }
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

// Send message
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const message = chatbotInput.value.trim();
  
  if (!message) return;

  // Add user message to chat
  addMessage(message, 'user');
  chatbotInput.value = '';
  chatbotSend.disabled = true;

  try {
    // Send message to backend
    const response = await fetch(getChatbotEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    if (data.success) {
      addMessage(data.message, 'ai');
    } else {
      addMessage('Sorry, I encountered an error. Please try again.', 'system');
    }
  } catch (error) {
    console.error('Error:', error);
    addMessage('Network error. Please check your connection and try again.', 'system');
  } finally {
    chatbotSend.disabled = false;
    chatbotInput.focus();
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chatbot-message', sender);
  
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('chatbot-message-content');
  contentDiv.textContent = text;
  
  messageDiv.appendChild(contentDiv);
  chatbotMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}