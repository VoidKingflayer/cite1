/**
 * TOCHKA SPA — INTERACTIVE LOGIC & BEHAVIORS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-link, .m-btn-primary');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
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
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      });
    });
  }

  // 2. Ritual Category Filter Tabs
  const filterPills = document.querySelectorAll('.filter-pill');
  const ritualRows = document.querySelectorAll('.ritual-row');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      ritualRows.forEach(row => {
        const cat = row.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 3. Select Ritual -> Autofill Booking & Scroll
  const selectBtns = document.querySelectorAll('.btn-select-ritual, .ritual-row');
  const ritualSelect = document.getElementById('ritualSelect');
  const bookingSection = document.getElementById('booking');

  selectBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      const row = el.closest('.ritual-row') || el;
      const ritualName = row.getAttribute('data-name');
      
      if (ritualSelect && ritualName) {
        for (let i = 0; i < ritualSelect.options.length; i++) {
          if (ritualSelect.options[i].value.includes(ritualName) || ritualName.includes(ritualSelect.options[i].value)) {
            ritualSelect.selectedIndex = i;
            break;
          }
        }

        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          ritualSelect.focus();
          ritualSelect.style.borderColor = '#4D535E';
          setTimeout(() => {
            ritualSelect.style.borderColor = '';
          }, 2000);
        }
      }
    });
  });

  // 4. Interactive Loyalty Stamps Simulator
  const stampSlots = document.querySelectorAll('.stamp-slot:not(.free-slot)');
  const freeSlot = document.querySelector('.stamp-slot.free-slot');
  const counterText = document.getElementById('stampCounterText');

  function updateStampMessage() {
    const activeCount = document.querySelectorAll('.stamp-slot.active:not(.free-slot)').length;
    if (activeCount === 5) {
      if (freeSlot) freeSlot.classList.add('active');
      counterText.innerHTML = '🎉 <strong>Congratulations!</strong> All 5 stamps collected. Your 6th session is 100% complimentary!';
      counterText.style.color = '#E8ECEF';
    } else {
      if (freeSlot) freeSlot.classList.remove('active');
      const left = 5 - activeCount;
      counterText.innerHTML = `${activeCount} of 5 stamps collected. ${left} more until your complimentary session!`;
      counterText.style.color = '';
    }
  }

  stampSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('active');
      const icon = slot.querySelector('.stamp-icon');
      if (slot.classList.contains('active')) {
        icon.innerText = '✋';
      } else {
        icon.innerText = '◯';
      }
      updateStampMessage();
    });
  });

  // 5. Gift Card Amount Switcher
  const amountBtns = document.querySelectorAll('.amount-btn');
  const gcDisplayAmount = document.getElementById('gcDisplayAmount');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const amount = btn.getAttribute('data-amount');
      if (gcDisplayAmount && amount) {
        gcDisplayAmount.innerText = `${amount} USD`;
        gcDisplayAmount.style.transform = 'scale(1.06)';
        setTimeout(() => {
          gcDisplayAmount.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // 6. Booking Form Submission
  const bookingForm = document.getElementById('omraBookingForm');
  const feedback = document.getElementById('omraFeedback');

  if (bookingForm && feedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>TRANSMITTING RESERVATION...</span>';

      setTimeout(() => {
        feedback.innerHTML = '✦ Reservation request received. Our TOCHKA Spa concierge will contact you via WhatsApp / Phone within 15 minutes to confirm your private suite.';
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    });
  }

  // 7. Header Shadow on Scroll
  const header = document.getElementById('omraHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 6px 20px rgba(61, 39, 31, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});
