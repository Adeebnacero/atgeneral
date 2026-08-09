// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form -> FormSubmit.co (delivers to atgeneralinfo@gmail.com, no backend needed)
var CONTACT_EMAIL = 'atgeneralinfo@gmail.com';
var form = document.getElementById('contactForm');
var successBox = document.getElementById('formSuccess');
var errorBox = document.getElementById('formError');
var submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // basic honeypot check
    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;

    successBox.style.display = 'none';
    errorBox.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    var payload = {
      name: form.name.value,
      club: form.club.value,
      sport: form.sport.value,
      email: form.email.value,
      message: form.message.value,
      _subject: 'New enquiry from atgeneral.com',
      _template: 'table',
      _captcha: 'false'
    };

    fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(function () {
        successBox.style.display = 'block';
        form.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .catch(function () {
        errorBox.style.display = 'block';
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
      });
  });
}
