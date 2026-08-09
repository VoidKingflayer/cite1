document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const alertBox = document.getElementById('booking-alert');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        client_name: document.getElementById('client_name').value,
        client_phone: document.getElementById('client_phone').value,
        client_email: document.getElementById('client_email').value || null,
        service_id: parseInt(document.getElementById('service_id').value),
        master_id: document.getElementById('master_id').value ? parseInt(document.getElementById('master_id').value) : null,
        booking_date: new Date(document.getElementById('booking_date').value).toISOString()
      };

      try {
        const response = await fetch('/api/bookings/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alertBox.style.display = 'block';
          alertBox.className = 'alert alert-success';
          alertBox.innerText = 'Запись успешно создана! Наш администратор свяжется с вами.';
          bookingForm.reset();
        } else {
          const errorData = await response.json();
          alertBox.style.display = 'block';
          alertBox.className = 'alert alert-danger';
          alertBox.innerText = 'Ошибка: ' + (errorData.detail || 'Не удалось отправить запись');
        }
      } catch (err) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-danger';
        alertBox.innerText = 'Сетевая ошибка. Попробуйте позже.';
      }
    });
  }
});
