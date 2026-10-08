/**
 * Sathwika Reddy - Portfolio Logic
 * Handles icons, sticky navbar, mobile drawer, active section spy, and safe mailto contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Active Section Highlighting using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 5. Contact Form Handler (Safe mailto composition)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const sendBtn = document.getElementById('sendBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      // Visual sending status
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<span>Opening email client...</span>`;
      }

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(
        `Hi Sathwika,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
      );
      const recipient = 'derasathwikareddy06@gmail.com';
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening your email client to complete sending...';
      }

      // Safely launch email client
      setTimeout(() => {
        window.location.href = mailtoUrl;

        // Reset state after slight delay
        setTimeout(() => {
          contactForm.reset();
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = `<i data-lucide="send"></i><span>Send Message</span>`;
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
              window.lucide.createIcons();
            }
          }
        }, 1200);
      }, 500);
    });
  }
});
