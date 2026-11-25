// Site behaviour. Plain JavaScript, no libraries.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // Intro curtain plays once per visit.
  try {
    if (sessionStorage.getItem('curtain')) $('.curtain')?.remove();
    sessionStorage.setItem('curtain', '1');
  } catch { /* storage blocked: the curtain simply plays again */ }
  setTimeout(() => $('.curtain')?.remove(), 2700);

  // Header shadow and mobile menu.
  const header = $('.header');
  const onHeader = () => header.classList.toggle('stuck', scrollY > 10);
  addEventListener('scroll', onHeader, { passive: true });
  onHeader();
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => document.getElementById(b.dataset.open).showModal()));
  $$('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
  $$('#menu a').forEach((a) => a.addEventListener('click', () => $('#menu').close()));

  // Puppy speech bubbles.
  $$('.buddy').forEach((b) => b.addEventListener('click', () => {
    b.classList.add('talk');
    setTimeout(() => b.classList.remove('talk'), 1500);
  }));

  // Reveal on scroll.
  const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    reveal.unobserve(e.target);
  }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => reveal.observe(el));

  // "Meet the pups": vertical scrolling moves the row of doors sideways.
  const meet = $('[data-hscroll]');
  if (meet) {
    const track = $('.meet-track', meet);
    const stage = $('.meet-stage', meet);
    const walker = $('.meet-pup', meet);
    const doors = $$('.door:not(.door-all)', meet);
    let distance = 0;
    let idle;
    const update = () => {
      const top = meet.getBoundingClientRect().top - header.offsetHeight;
      const x = Math.min(Math.max(-top, 0), distance);
      track.style.transform = `translateX(${-x}px)`;
      doors.forEach((d) => d.classList.toggle('open', x > 0 && d.getBoundingClientRect().left < innerWidth * 0.62));
    };
    const size = () => {
      distance = Math.max(track.scrollWidth - stage.clientWidth, 0);
      meet.style.height = `${stage.offsetHeight + distance}px`;
      update();
    };
    addEventListener('scroll', () => {
      update();
      walker.classList.add('walking');
      clearTimeout(idle);
      idle = setTimeout(() => walker.classList.remove('walking'), 160);
    }, { passive: true });
    addEventListener('resize', size);
    // Keyboard users: scroll the page so a focused door comes into view.
    track.addEventListener('focusin', (e) => {
      const door = e.target.closest('.door');
      const x = Math.min(Math.max(door.offsetLeft - stage.clientWidth / 3, 0), distance);
      stage.scrollLeft = 0;
      scrollTo({ top: meet.offsetTop + x, behavior: 'auto' });
    });
    size();
  }

  // Chat: messages arrive as each step scrolls into view.
  const steps = $$('.chat-steps li');
  if (steps.length) {
    const screen = $('.phone-screen');
    const show = (n) => {
      steps.forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === n));
      $$('.msg').forEach((m) => m.classList.toggle('shown', Number(m.dataset.msg) <= n));
      screen.scrollTop = screen.scrollHeight;
      const video = $('.clip video');
      if (n === 2 && !reduced) video.play().catch(() => {});
      else video.pause();
    };
    let current = -1;
    const update = () => {
      let n = 0;
      steps.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.7) n = Number(s.dataset.step); });
      if (n !== current) { current = n; show(n); }
    };
    addEventListener('scroll', update, { passive: true });
    update();
  }

  // Puppy filters, synced with the URL (?origin=&breed=&sex=).
  const grid = $('#sketches');
  if (grid) {
    const params = new URLSearchParams(location.search);
    const state = { origin: params.get('origin') || '', breed: params.get('breed') || '', sex: params.get('sex') || '' };
    const items = $$('li', grid);
    const matches = (li) => {
      const breed = li.dataset.breed;
      if (state.origin === 'korean' && !breed.includes('korean')) return false;
      if ((state.origin === 'local' || state.origin === 'imported') && li.dataset.origin !== state.origin) return false;
      if (state.breed && !breed.includes(state.breed.replace('-', ' '))) return false;
      if (state.sex && !li.dataset.sex.includes(state.sex)) return false;
      return true;
    };
    const apply = () => {
      let n = 0;
      items.forEach((li) => {
        const ok = matches(li);
        li.hidden = !ok;
        if (ok) n += 1;
      });
      $('#count').textContent = `${n} ${n === 1 ? 'puppy' : 'puppies'}`;
      $('#empty').hidden = n > 0;
      $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(state[b.dataset.filter] === b.dataset.value)));
      const query = new URLSearchParams(Object.entries(state).filter(([, v]) => v)).toString();
      history.replaceState(null, '', query ? `?${query}` : location.pathname);
    };
    $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      const { filter, value } = b.dataset;
      state[filter] = state[filter] === value ? '' : value;
      apply();
    }));
    $('#reset').addEventListener('click', () => { Object.assign(state, { origin: '', breed: '', sex: '' }); apply(); });
    apply();
  }

  // Lightbox for photos and videos.
  const box = $('#lightbox');
  let set = [];
  let index = 0;
  const render = () => {
    const el = set[index];
    const stage = $('.lb-stage', box);
    const node = document.createElement(el.dataset.video ? 'video' : 'img');
    if (el.dataset.video) Object.assign(node, { src: el.dataset.video, poster: el.dataset.src, controls: true, autoplay: true, playsInline: true });
    else Object.assign(node, { src: el.dataset.src, alt: el.dataset.caption || 'Photo' });
    stage.replaceChildren(node);
    $('figcaption', box).textContent = `${el.dataset.caption || ''}  ${index + 1} / ${set.length}`;
  };
  const open = (group, el) => {
    set = $$(`[data-lightbox="${group}"]`);
    index = set.indexOf(el);
    render();
    box.showModal();
  };
  const move = (d) => { index = (index + d + set.length) % set.length; render(); };
  $$('[data-lightbox="wall"]').forEach((el) => el.addEventListener('click', () => open('wall', el)));
  $('.prev', box).addEventListener('click', () => move(-1));
  $('.next', box).addEventListener('click', () => move(1));
  box.addEventListener('close', () => $('.lb-stage', box).replaceChildren());
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });

  // Puppy profile gallery.
  const gallery = $('[data-gallery]');
  if (gallery) {
    const thumbs = $$('[data-thumb]', gallery);
    const main = $('.gallery-open', gallery);
    let at = 0;
    const select = (i) => {
      at = (i + thumbs.length) % thumbs.length;
      $('img', main).src = thumbs[at].dataset.src;
      thumbs.forEach((t, n) => t.setAttribute('aria-current', String(n === at)));
      const counter = $('.gallery-count', gallery);
      if (counter) counter.textContent = `${at + 1} / ${thumbs.length}`;
    };
    thumbs.forEach((t, i) => t.addEventListener('click', () => {
      select(i);
      if (t.dataset.video) open('pup', t);
    }));
    $$('[data-step]', gallery).forEach((b) => b.addEventListener('click', () => select(at + Number(b.dataset.step))));
    main.addEventListener('click', () => open('pup', thumbs[at]));
  }

  // "How it works" tabs.
  $$('[data-tab]').forEach((tab) => tab.addEventListener('click', () => {
    $$('[data-tab]').forEach((t) => {
      t.setAttribute('aria-selected', String(t === tab));
      document.getElementById(t.dataset.tab).hidden = t !== tab;
    });
    $$('.panel:not([hidden]) .reveal').forEach((el) => el.classList.add('in'));
  }));

  // FAQ search.
  const search = $('#faq-search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let n = 0;
      $$('.pin-note').forEach((note) => {
        const ok = note.textContent.toLowerCase().includes(q);
        note.hidden = !ok;
        if (ok) n += 1;
      });
      $('#faq-count').textContent = `${n} ${n === 1 ? 'note' : 'notes'} on the board`;
      $('#faq-empty').hidden = n > 0;
    });
  }

  // Enquiry forms: validate, then open WhatsApp with the message filled in.
  $$('[data-form]').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    if (f.website) return; // spam trap
    const problems = {
      name: f.name.trim() ? '' : 'Please tell us your name.',
      phone: /^\+?[\d\s()-]{7,20}$/.test(f.phone.trim()) ? '' : 'Please enter a phone number with country code.',
      email: !f.email || /^\S+@\S+\.\S+$/.test(f.email) ? '' : 'That email address looks incomplete.',
    };
    Object.entries(problems).forEach(([name, message]) => {
      const input = form.elements[name];
      input.setAttribute('aria-invalid', String(Boolean(message)));
      const slot = input.closest('.field')?.querySelector('.error');
      if (slot) slot.textContent = message;
    });
    const status = $('.form-status', form);
    const bad = Object.keys(problems).find((k) => problems[k]);
    status.classList.toggle('bad', Boolean(bad));
    if (bad) {
      status.textContent = problems[bad];
      form.elements[bad].focus();
      return;
    }
    const puppy = form.dataset.puppy || f.puppy;
    const text = [
      'Hi TeddyPups!',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email && `Email: ${f.email}`,
      f.area && `Area: ${f.area}`,
      puppy && `Puppy: ${puppy}`,
      f.message && `Message: ${f.message}`,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/919898124987?text=${encodeURIComponent(text)}`;
    open_(url);
    status.innerHTML = 'Thank you! Send the message in WhatsApp to finish. ';
    const link = Object.assign(document.createElement('a'), { href: url, target: '_blank', rel: 'noopener', textContent: 'Open WhatsApp' });
    link.style.textDecoration = 'underline';
    status.append(link);
  }));

  function open_(url) {
    window.open(url, '_blank', 'noopener');
  }
})();
