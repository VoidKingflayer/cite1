/**
 * UNIQUE FASHION SHOW PARIS — INTERACTIVE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (mobileDrawer.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 2. Statistics Number Counter Animation
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  }

  const numbersSection = document.getElementById('numbers');
  if (numbersSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(numbersSection);
  } else {
    animateCounters();
  }

  // 3. Language Switcher Toggle
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 4. Form Submission Simulation
  const form = document.getElementById('applicationForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.querySelector('span').innerText = 'TRANSMITTING APPLICATION...';

      setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = '✦ APPLICATION RECEIVED. The UNIQUE Fashion Paris curatorial committee will review your dossier within 24 hours.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = 'SUBMIT APPLICATION';
      }, 1200);
    });
  }

  // 5. Scroll Header Visual Effect
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    }
  });
});
