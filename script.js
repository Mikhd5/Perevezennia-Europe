(() => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Відкрити меню' : 'Закрити меню');
      nav.classList.toggle('open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Відкрити меню');
    }));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Відкрити меню');
      }
    });
  }

  // Reveal sections only when they enter the viewport; respect reduced motion.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Route country chips preselect the destination country in the booking form.
  const countrySelect = document.getElementById('toCountry');
  document.querySelectorAll('.country-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const country = chip.dataset.country;
      if (countrySelect && [...countrySelect.options].some(option => option.value === country || option.textContent === country)) {
        countrySelect.value = country;
      }
      document.querySelectorAll('.country-chip').forEach(item => item.classList.toggle('active', item === chip));
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Set the earliest selectable travel date to the user's local date.
  const dateInput = document.getElementById('travelDate');
  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }

  // Build a prefilled WhatsApp message. The carrier confirms availability separately.
  const form = document.getElementById('bookingForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const value = key => String(data.get(key) || '').trim();
      const name = value('name');
      const phone = value('phone');
      const from = value('from');
      const country = value('country');
      const to = value('to');
      const date = value('date');
      const passengers = value('passengers');
      const comment = value('comment');
      const lines = [
        'Вітаю! Хочу уточнити можливість бронювання поїздки.',
        '',
        `Ім’я: ${name}`,
        `Телефон: ${phone}`,
        `Звідки: ${from}`,
        `Країна призначення: ${country}`,
        to ? `Місто / адреса призначення: ${to}` : null,
        date ? `Бажана дата: ${date}` : null,
        `Кількість пасажирів: ${passengers}`,
        comment ? `Додаткова інформація: ${comment}` : null,
        '',
        'Будь ласка, повідомте про наявність місць та деталі маршруту.'
      ].filter(Boolean);
      const url = `https://wa.me/380630606110?text=${encodeURIComponent(lines.join('\n'))}`;
      if (formMessage) formMessage.textContent = 'Відкриваємо WhatsApp із заповненою заявкою. Перевірте повідомлення та надішліть його менеджеру.';
      const win = window.open(url, '_blank');
      if (win) win.opener = null;
      else window.location.href = url;
    });
  }

  // Accessible photo lightbox.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImage) lightboxImage.src = '';
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-lightbox]').forEach(button => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightbox;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('lightboxClose')?.focus();
    });
  });
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
