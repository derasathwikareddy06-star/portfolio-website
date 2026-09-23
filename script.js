/**
 * Portfolio JavaScript
 * Developer: Sathwika Reddy
 * B.Tech CSE (AI & ML) - GNIT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // check on load

  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Active Section Highlighting using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-list .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkElements.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 5. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'modalFadeIn 0.3s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Resume Modal Actions
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const downloadResumeFileBtn = document.getElementById('downloadResumeFileBtn');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (resumeModal) {
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  // Close when clicking outside dialog
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  // Handle ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Resume Download Action (Generates text/formatted resume file)
  if (downloadResumeFileBtn) {
    downloadResumeFileBtn.addEventListener('click', () => {
      const resumeContent = `=====================================================
SATHWIKA REDDY
Hyderabad, Telangana, India
Email: sathwikareddydera@gmail.com
LinkedIn: https://linkedin.com/in/sathwikareddydera
GitHub: https://github.com/derasathwikareddy06-star
=====================================================

CAREER SUMMARY:
4th-Year Computer Science and Engineering (Artificial Intelligence & Machine Learning) student at Guru Nanak Institute of Technology (GNIT). Passionate about applying machine learning, NLP, and software engineering principles to solve practical challenges.

EDUCATION:
- B.Tech in Computer Science and Engineering (AI & ML)
  Guru Nanak Institute of Technology (GNIT), Hyderabad (2022 - 2026)
- Intermediate (MPC Stream) - Class XII
  Telangana State Board of Intermediate Education (2020 - 2022)
- Secondary School Certificate (SSC) - Class X (Completed 2020)

CORE TECHNICAL SKILLS:
- Programming Languages: Python, Java, C, C++, SQL, JavaScript
- AI & Data Science: Machine Learning (Supervised/Unsupervised), NLP, Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn, Deep Learning Basics
- Web & Tools: HTML5, CSS3, Streamlit, Flask, Git, GitHub, MySQL, VS Code, Jupyter Notebooks

FEATURED PROJECTS:
1. Clinical & Research Text Summarizer (NLP, Python, Streamlit)
   - Extractive and abstractive NLP summarization pipeline for research papers and clinical articles.
2. Customer Churn & Behavioral Predictor (ML, Scikit-Learn, Pandas, XGBoost)
   - Predictive analytics system identifying customer churn probabilities.
3. Plant Leaf Disease Detection System (Computer Vision, CNN, Flask)
   - Leaf image classification system for agricultural decision support.
4. Student Performance & Attendance Tracker (JavaScript, HTML/CSS, Flask, MySQL)
   - Academic record and attendance portal with database management.
=====================================================`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Sathwika_Reddy_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  }

  // 7. Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('messageSubject').value.trim();
      const message = document.getElementById('messageBody').value.trim();

      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all required fields.', 'error');
        return;
      }

      // Visual sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      // Simulate sending and open direct mail client fallback
      setTimeout(() => {
        showFeedback(`Thank you, ${name}! Your message has been prepared. Opening your email app to send...`, 'success');
        
        // Prepare mailto link with pre-filled content
        const mailtoLink = `mailto:sathwikareddydera@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Sathwika,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i data-lucide="send"></i><span>Send Message</span>`;
          if (window.lucide) window.lucide.createIcons();
        }
      }, 700);
    });
  }

  function showFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  }

  // 8. Update Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
