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

// Knowledge base for chatbot
const chatbotKnowledge = [
    { keywords: ['hello', 'hi', 'hey', 'greetings', 'howdy'], 
      response: "Hello! 👋 I'm Rhizmon's AI assistant. Feel free to ask me anything about Rhizmon's skills, projects, or experience!" },
    
    { keywords: ['skill', 'skills', 'expertise', 'what can you do', 'what do you know'],
      response: "Rhizmon has expertise in:\n• Frontend: HTML, CSS, JavaScript, UI/UX design\n• Backend: PHP, Firebase, MySQL\n• Other: Python, Dart, Java, AI\n\nWhat would you like to know more about?" },
    
    { keywords: ['project', 'projects', 'portfolio', 'work', 'portfolio item', 'build', 'created'],
      response: "Rhizmon has 4 main projects:\n1. Valcitizen - Citizen engagement platform\n2. Tapsilugaw Website - Restaurant ordering system\n3. PLV-Share App - Android lending app for students\n4. Singko O Tres - Educational game\n\nWhich one interests you?" },
    
    { keywords: ['valcitizen'],
      response: "Valcitizen: A citizen engagement platform designed to connect communities and encourage civic participation. Built with modern web technologies for seamless user experience." },
    
    { keywords: ['tapsilugaw', 'restaurant'],
      response: "Tapsilugaw Website: A full-featured restaurant website built with HTML, CSS, and PHP. It includes menu display, online ordering, admin moderation system, and responsive UI design." },
    
    { keywords: ['plv-share', 'android', 'app', 'lending'],
      response: "PLV-Share App: An Android application for students to lend and borrow academic items. Built with Dart, Firebase, and Node.js. Perfect for students who need to share resources!" },
    
    { keywords: ['singko', 'game', 'tres'],
      response: "Singko O Tres: An educational game where the main character defeats low grades as enemies to pass the course. Built with Java and AI mechanics. A creative way to make learning fun!" },
    
    { keywords: ['frontend', 'web', 'html', 'css', 'javascript', 'ui', 'design', 'responsive'],
      response: "Rhizmon excels in frontend development with:\n• Responsive design\n• CSS animations and effects\n• Modern UI/UX principles\n• JavaScript interactivity\n• Accessibility best practices\n\nThis chatbot is actually an example of frontend-backend integration!" },
    
    { keywords: ['backend', 'php', 'server', 'database', 'mysql', 'firebase', 'authentication'],
      response: "Rhizmon's backend skills include:\n• PHP development\n• MySQL database management\n• Firebase integration\n• Authentication systems\n• Server-side deployment" },
    
    { keywords: ['game', 'test', 'testing', 'qa', 'quality assurance', 'tester'],
      response: "Rhizmon has experience as a Game Tester with skills in:\n• Bug identification and reporting\n• Gameplay mechanics feedback\n• Quality assurance testing\n• User experience optimization\n\nThis experience complements web and game development!" },
    
    { keywords: ['education', 'study', 'degree', 'college', 'university', 'certificate'],
      response: "Rhizmon is:\n• Currently pursuing BS in Information Technology\n• Cisco Networking Academy certified\n• Continuously learning new technologies\n\nWhat aspect of tech are you interested in?" },
    
    { keywords: ['contact', 'reach out', 'email', 'facebook', 'instagram', 'linkedin', 'github', 'social'],
      response: "You can reach Rhizmon on:\n📧 Email: rhizmonpoquiz@gmail.com\n🐙 GitHub: erizuu\n💼 LinkedIn: Poquiz Rhizmon\n📱 Instagram: riiiizu_/\n👍 Facebook: eriiiizuuuu\n💬 Discord: Available\n\nCheck the Contacts page for direct links!" },
    
    { keywords: ['about', 'who', 'rhizmon', 'introduce', 'tell me about'],
      response: "I'm an AI assistant for Rhizmon's portfolio! Rhizmon is a passionate Developer and AI Enthusiast who loves creating modern web applications, interactive systems, and AI-integrated solutions. Currently studying Information Technology with a focus on web development and artificial intelligence." },
    
    { keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'future'],
      response: "Rhizmon is very interested in AI and machine learning! The fact that you're talking to an AI chatbot right now is an example of Rhizmon's passion for AI integration. Always exploring ways to incorporate AI into projects!" },
    
    { keywords: ['tools', 'software', 'technology', 'framework', 'language'],
      response: "Rhizmon uses:\n• Editors: VS Code\n• Version Control: Git\n• Backend: Firebase, PHP, MySQL\n• Languages: HTML, CSS, JavaScript, Python, Dart, Java\n• Design: Responsive design, UI/UX principles\n\nAlways learning new tools!" },
    
    { keywords: ['hire', 'available', 'freelance', 'job', 'opportunity', 'work with'],
      response: "Rhizmon is open to opportunities! For project inquiries or collaboration, please reach out through the Contacts page. You can send a message directly or connect on social media. Looking forward to hearing from you!" }
];

// Function to find best response
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  
  for (let item of chatbotKnowledge) {
    let score = 0;
    for (let keyword of item.keywords) {
      if (lowerMessage.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item.response;
    }
  }
  
  // Default responses if no match
  if (!bestMatch) {
    const defaults = [
      "That's an interesting question! Feel free to ask me about Rhizmon's skills, projects, or experience.",
      "I'm here to help! Try asking about Rhizmon's projects, skills, or background.",
      "Great question! To give you the best answer, try asking about specific areas like frontend, backend, or the projects Rhizmon has built.",
      "I'm not sure about that, but I'd love to tell you more about Rhizmon's work!"
    ];
    bestMatch = defaults[Math.floor(Math.random() * defaults.length)];
  }
  
  return bestMatch;
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

function sendMessage() {
  const message = chatbotInput.value.trim();
  
  if (!message) return;

  // Add user message to chat
  addMessage(message, 'user');
  chatbotInput.value = '';
  chatbotSend.disabled = true;

  // Simulate slight delay for better UX
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    addMessage(botResponse, 'ai');
    chatbotSend.disabled = false;
    chatbotInput.focus();
  }, 300);
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