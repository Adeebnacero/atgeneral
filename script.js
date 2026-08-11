document.getElementById('year').textContent = new Date().getFullYear();
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function (l) {
    l.addEventListener('click', function () { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); });
  });
}
var CONTACT_EMAIL = 'atgeneralinfo@gmail.com';
var form = document.getElementById('contactForm');
var successBox = document.getElementById('formSuccess');
var errorBox = document.getElementById('formError');
var submitBtn = document.getElementById('submitBtn');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;
    successBox.style.display = 'none'; errorBox.style.display = 'none';
    submitBtn.disabled = true; submitBtn.textContent = 'sending…';
    var payload = {
      name: form.name.value, organisation: form.org.value, project_type: form.project.value,
      email: form.email.value, message: form.message.value,
      _subject: 'New enquiry from ATGeneral website', _template: 'table', _captcha: 'false'
    };
    fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
      method: 'POST', headers: {'Content-Type':'application/json', Accept:'application/json'},
      body: JSON.stringify(payload)
    }).then(function(res){ if(!res.ok) throw new Error('fail'); return res.json(); })
      .then(function(){ successBox.style.display='block'; form.reset(); successBox.scrollIntoView({behavior:'smooth',block:'nearest'}); })
      .catch(function(){ errorBox.style.display='block'; errorBox.scrollIntoView({behavior:'smooth',block:'nearest'}); })
      .finally(function(){ submitBtn.disabled=false; submitBtn.textContent='Send'; });
  });
}
