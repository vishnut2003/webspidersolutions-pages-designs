/* Web Spider Solutions — homepage interactions. Dependency-free. */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Header: hairline appears once the page has scrolled ---------------- */
  var header = doc.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Desktop dropdowns: hover is CSS; click/keyboard handled here ------- */
  var menuItems = Array.prototype.slice.call(doc.querySelectorAll('.site-nav__item.has-menu'));

  function setExpanded(item, open) {
    item.classList.toggle('is-open', open);
    var trigger = item.querySelector('.site-nav__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', String(open));
  }

  function closeMenus(except) {
    menuItems.forEach(function (item) {
      if (item !== except) setExpanded(item, false);
    });
  }

  menuItems.forEach(function (item) {
    var trigger = item.querySelector('.site-nav__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      closeMenus(item);
      setExpanded(item, open);
    });

    item.addEventListener('mouseenter', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', function () {
      if (!item.classList.contains('is-open')) trigger.setAttribute('aria-expanded', 'false');
    });

    // Tabbing out of the last link closes the menu.
    item.addEventListener('focusout', function (event) {
      if (!item.contains(event.relatedTarget)) setExpanded(item, false);
    });
  });

  doc.addEventListener('click', function (event) {
    if (!event.target.closest('.site-nav__item.has-menu')) closeMenus();
  });

  /* --- Mobile navigation ---------------------------------------------------- */
  var toggle = doc.querySelector('.nav-toggle');
  var mobileNav = doc.getElementById('mobile-nav');
  var lastFocus = null;

  function focusable(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href], button:not([disabled]), summary, input, select, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function openNav() {
    if (!mobileNav) return;
    lastFocus = doc.activeElement;
    mobileNav.hidden = false;
    // Two frames so the transition runs after display changes.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { mobileNav.classList.add('is-open'); });
    });
    doc.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('is-active');
    var first = focusable(mobileNav)[0];
    if (first) first.focus();
  }

  function closeNav() {
    if (!mobileNav || mobileNav.hidden) return;
    mobileNav.classList.remove('is-open');
    doc.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('is-active');
    window.setTimeout(function () { mobileNav.hidden = true; }, reduceMotion ? 0 : 340);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      if (mobileNav.hidden) openNav(); else closeNav();
    });

    Array.prototype.forEach.call(mobileNav.querySelectorAll('[data-nav-close]'), function (el) {
      el.addEventListener('click', closeNav);
    });

    // Focus trap while the panel is open.
    mobileNav.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var items = focusable(mobileNav);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Close if the viewport grows into the desktop layout.
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) closeNav();
    });
  }

  doc.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (mobileNav && !mobileNav.hidden) {
      closeNav();
      return;
    }
    var openItem = menuItems.filter(function (i) { return i.classList.contains('is-open'); })[0];
    if (openItem) {
      setExpanded(openItem, false);
      openItem.querySelector('.site-nav__trigger').focus();
    }
  });

  /* --- Reveal on scroll ------------------------------------------------------- */
  var revealEls = doc.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    Array.prototype.forEach.call(revealEls, function (el) { revealObserver.observe(el); });
  }

  /* --- Count-up numbers --------------------------------------------------------- */
  function formatNumber(value) {
    return value.toLocaleString('en-IN');
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + formatNumber(Math.round(target * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var countEls = doc.querySelectorAll('[data-count]');
  if (!reduceMotion && 'IntersectionObserver' in window && countEls.length) {
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(countEls, function (el) { countObserver.observe(el); });
  }

  /* --- Testimonial switcher ------------------------------------------------------ */
  var quoteCard = doc.querySelector('.quote-card');
  if (quoteCard) {
    var quotes = Array.prototype.slice.call(quoteCard.querySelectorAll('.quote'));
    var dots = Array.prototype.slice.call(quoteCard.querySelectorAll('.dots__dot'));
    var index = 0;

    function showQuote(next) {
      index = (next + quotes.length) % quotes.length;
      quotes.forEach(function (q, i) { q.classList.toggle('is-active', i === index); });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === index);
        d.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    var prev = quoteCard.querySelector('[data-quote-prev]');
    var next = quoteCard.querySelector('[data-quote-next]');
    if (prev) prev.addEventListener('click', function () { showQuote(index - 1); });
    if (next) next.addEventListener('click', function () { showQuote(index + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { showQuote(i); }); });
  }

  /* --- Presentational form: intercept submit ------------------------------------- */
  var form = doc.querySelector('.cta__form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (!button) return;
      var labelEl = button.querySelector('span') || button;
      var label = labelEl.textContent;
      labelEl.textContent = 'Request sent ✓';
      button.disabled = true;
      window.setTimeout(function () {
        labelEl.textContent = label;
        button.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
