(function () {
  'use strict';

  /* Scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Fit the video frame to the clip's orientation (phone videos are often vertical) */
  var video = document.getElementById('promo');
  var frame = document.getElementById('video-frame');
  if (video && frame) {
    var fit = function () {
      if (video.videoWidth && video.videoHeight) {
        frame.classList.toggle('is-portrait', video.videoHeight > video.videoWidth);
      }
    };
    video.addEventListener('loadedmetadata', fit);
    fit();
  }

  /* Booking form: validation + Netlify Forms AJAX submit */
  var form = document.getElementById('booking-form');
  if (!form) return;

  // Earliest selectable date is tomorrow
  var dateInput = form.querySelector('#preferred_date');
  if (dateInput) {
    var t = new Date(); t.setDate(t.getDate() + 1);
    dateInput.min = t.toISOString().slice(0, 10);
  }

  var setError = function (field, msg) {
    var err = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg || '';
  };

  var validate = function () {
    var ok = true, first = null;
    form.querySelectorAll('[required]').forEach(function (f) {
      var msg = '';
      if (f.type === 'checkbox' && !f.checked) msg = 'Please confirm to continue.';
      else if (f.type !== 'checkbox' && !f.value.trim()) msg = 'This field is required.';
      else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Please enter a valid email address.';
      else if (f.type === 'tel' && f.value.replace(/\D/g, '').length < 10) msg = 'Please enter a 10-digit phone number.';
      setError(f, msg);
      if (msg) { ok = false; first = first || f; }
    });
    if (first) first.focus();
    return ok;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    var body = new URLSearchParams(new FormData(form)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
      .then(function (r) { if (!r.ok) throw new Error(r.status); window.location.href = form.getAttribute('action'); })
      .catch(function () { form.submit(); });
  });

  form.querySelectorAll('input, select, textarea').forEach(function (f) {
    f.addEventListener('blur', function () { if (f.getAttribute('aria-invalid') === 'true') validate(); });
  });
})();
