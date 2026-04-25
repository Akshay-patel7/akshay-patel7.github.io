// Akshay Patel — Personal Site
// Small set of interactions: nav border on scroll, live clock,
// role rotator, and scroll-reveal.

(function () {
  'use strict';

  // Sticky-nav border
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Live clock (Boston, ET)
  function tick() {
    var el = document.getElementById('time-now');
    if (!el) return;
    var t = new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    el.textContent = t + ' EST · LIVE';
  }
  tick();
  setInterval(tick, 1000);

  // Role rotator
  var roles = [
    'founding engineer.',
    'full-stack developer.',
    'devops & platform.',
    'security-minded eng.',
    'shipping at eddi.'
  ];
  var rotator = document.getElementById('rotator');
  if (rotator) {
    var ri = 0;
    rotator.textContent = roles[0];
    setInterval(function () {
      if (window.__rotatorEnabled === false) return;
      ri = (ri + 1) % roles.length;
      rotator.style.opacity = 0;
      setTimeout(function () {
        rotator.textContent = roles[ri];
        rotator.style.opacity = 1;
      }, 250);
    }, 2200);
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
  }
})();
