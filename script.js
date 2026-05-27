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