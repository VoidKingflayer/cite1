/**
 * TOCHKA | MASSAGE & SPA — INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-nav-link, .m-btn-book');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileDrawer.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      });
    });
  }

  // 2. Service Card Click to Auto-Select Treatment & Scroll to Booking
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSelect = document.getElementById('selectedService');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        // Find matching option or set value
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.includes(serviceName) || serviceName.includes(serviceSelect.options[i].value)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
        
        // Scroll smoothly to contacts section
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
          
          // Subtle focus highlight on select
          serviceSelect.focus();
          serviceSelect.style.borderColor = '#D4AF77';
          setTimeout(() => {
            serviceSelect.style.borderColor = '';
          }, 2000);
        }
      }
    });
  });

  // 3. Contact & Booking Form Handler
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('gisoFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';

      setTimeout(() => {
        feedback.innerHTML = '✦ Thank you. We have received your request and will contact you shortly.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }

  // 4. Header Shadow on Scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
