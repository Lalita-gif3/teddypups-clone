// One function per page.
const { SITE, pups, CHAT_VIDEO, CHAT_PHOTOS, CAPTIONED, MOMENTS, QUOTE, FAQ } = require('./data');
const { esc, media, sized, img,wa, paw, buddy, underline, heart, stars } = require('./ui');

const available = pups.filter((p) => p.available);
const goneHome = pups.filter((p) => !p.available);
const bySlug = (s) => pups.find((p) => p.slug === s);
const hasVideo = (p) => p.media.some((m) => m.video);
const lower = (s) => s.toLowerCase();

const doorMeta = (p) => `${p.name !== p.breed ? `${esc(p.breed)}, ` : ''}${lower(p.sex)}, ${esc(p.age)}${hasVideo(p) ? ', with video' : ''}`;
const polaroid = (src, caption, i) => `<li class="reveal"><button type="button" class="polaroid tilt-${i % 4}" data-lightbox="wall" data-src="${sized(src, 1920)}" data-caption="${esc(caption)}" aria-label="Open photo ${i + 1}">
<span class="tape"></span>${img(src, caption || 'A happy family with their puppy')}${caption ? `<span class="hand">${caption}</span>` : ''}</button></li>`;

const sketch = (p, i) => `<li class="reveal" data-breed="${esc(lower(p.breed))}" data-sex="${esc(lower(p.sex))}" data-origin="${p.local ? 'local' : 'imported'}">
<a class="sketch" href="/puppies/${p.slug}">
<span class="sketch-frame wash-${i % 4}"><span class="sketch-photo">${img(p.media[0].src, p.name)}</span>
<span class="sticker hand">${p.available ? 'Available' : 'Gone home'}</span>${hasVideo(p) ? '<span class="sketch-video">▶ video</span>' : ''}</span>
<span class="display sketch-name">${esc(p.name)}</span><span class="sketch-meta">${esc(p.breed)} · ${lower(p.sex)} · ${esc(p.age)}</span></a></li>`;

const skyline = (cls) => `<svg class="${cls}" viewBox="0 0 400 140" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><path d="M0 138h400M25 138V90h26v48M58 138V62h30v76M95 138v-42h22v42M170 138V45l8-12V8h6v25l8 12v93M205 138V70l22 14v54M240 138V95h28v43M275 138V60h22v78M305 138V100h34v38" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`;

function home() {
  const lineup = ['maltipoo-max-male', 'korean-teacup-maltipoo-female', 'korean-teacup-poodle-female', 'maltipoo-cavapoo-male', 'toy-poodle-male-female', 'maltipoo-female-2'].map(bySlug);
  const seat = (p) => `<li><a href="/puppies/${p.slug}"><span class="arch">${img(p.media[0].src, p.name, '')}</span><span class="hand">${esc(p.name)}</span></a></li>`;

  const doors = available.map((p, i) => `<li class="door"><a href="/puppies/${p.slug}">
<span class="door-plate"><span class="display">${esc(p.name)}</span><span>${doorMeta(p)}</span></span>
<span class="door-frame"><span class="door-room">${img(p.media[0].src, p.name)}</span><span class="door-leaf leaf-${i % 3}">${paw()}<i class="knob"></i></span><span class="door-tag hand">Available</span></span></a></li>`).join('');

  const steps = [
    ['Choose your breed', "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
    ['Get photos &amp; details', 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.'],
    ['Secure &amp; safe delivery', 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.'],
  ];
  const stamps = [
    ['round', '♡', 'Vet-checked &amp; healthy', 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.'],
    ['ticket', '✈', 'Korea to Dubai, safely', 'Trusted breeders, safe travel, and premium care from start to finish.'],
    ['oval', '✉', 'Support 24/7', 'Always here to help, from choosing your puppy to post-delivery support.'],
    ['scallop', '⊕', 'Trusted by families worldwide', 'Puppies delivered to loving homes all around the world.'],
  ];

  const body = `
<section class="scene hero">
<div class="hero-copy gutter"><p class="hand hero-note">every puppy is family${underline()}</p>
<h1 class="display"><span>Premium teacup</span> <span>puppies in Dubai</span></h1>
<p class="lede">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
<div class="actions"><a class="btn btn-primary" href="/puppies">View available puppies</a><a class="btn btn-ghost" href="${wa()}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div></div>
<div class="hero-stage"><ul class="lineup">${lineup.slice(0, 3).map(seat).join('')}<li class="lineup-pup">${buddy('peek', 'peekaboo!')}</li>${lineup.slice(3).map(seat).join('')}</ul><div class="quilt"></div></div>
</section>

<section class="scene meet" data-hscroll>
<div class="meet-stage">
<header class="meet-head gutter"><div><h2 class="display huge">Meet the pups</h2><p class="lede">Real puppies, real photos, looking for their families right now.</p></div>
<a class="btn btn-primary" href="/puppies">See all available puppies</a></header>
<div class="meet-hall"><ol class="meet-track">${doors}<li class="door door-all"><a href="/puppies"><span class="door-frame"><span class="display">Meet them all</span></span></a></li></ol>
<div class="floor"></div>${buddy('meet-pup', 'knock knock!')}</div>
</div></section>

<section class="scene paths"><div class="gutter wrap">
<h2 class="display huge center">Two ways to meet your puppy</h2>
<div class="fork">
<article class="way left reveal"><h3 class="sign display">Puppies in Dubai</h3>
<div class="way-scene">${skyline('skyline')}<figure class="window">${img(CHAT_PHOTOS[0], 'A puppy in our showroom')}<figcaption class="hand">In our showroom</figcaption></figure></div>
<p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p><a class="btn btn-primary" href="/puppies?origin=local">Meet local puppies</a></article>
<div class="post" aria-hidden="true">${buddy('', 'this way!')}</div>
<article class="way right reveal"><h3 class="sign display">Imported for you</h3>
<div class="way-scene flight"><svg viewBox="0 0 320 180" aria-hidden="true"><path d="M20 160Q130 0 300 100" fill="none" stroke="#a24a1a" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/><circle cx="20" cy="160" r="5" fill="#a24a1a"/><circle cx="300" cy="100" r="5" fill="#a24a1a"/><g class="plane"><g stroke="#2a170e" stroke-width="2.5"><path d="M140 48l30-40h18l-10 40zM140 70l30 40h18l-10-40zM88 45l16 2 8 12-14 2z" fill="#a24a1a"/><rect x="95" y="46" width="120" height="30" rx="15" fill="#fffdf8"/><circle cx="170" cy="61" r="9" fill="#bfddf5"/></g></g><text x="6" y="178">Korea</text><text x="280" y="124">Dubai</text></svg></div>
<p>Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.</p><a class="btn btn-primary" href="/puppies?origin=imported">See imported puppies</a></article>
</div></div></section>

<section class="scene chat"><div class="chat-grid gutter">
<div><h2 class="display huge">Your puppy journey</h2><p class="lede">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
<ol class="chat-steps">${steps.map(([t, d], i) => `<li data-step="${i + 1}"><span class="num display">${i + 1}</span><h3 class="display">${t}</h3><p>${d}</p></li>`).join('')}</ol>
<a class="btn btn-ghost" href="/how-it-works">How it works</a></div>
<div class="chat-side"><div class="phone">
<div class="phone-bar"><img src="${SITE.mediaHost}/brand/logo.png" alt="" width="36" height="36" loading="lazy"><span><b>TeddyPups U.A.E.</b><small>online</small></span></div>
<div class="phone-screen">
<p class="msg me" data-msg="0">Hi TeddyPups! I'd love to know more about your puppies.</p>
<div class="msg them" data-msg="1"><p>${steps[0][1]}</p><ul class="chips">${['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((b) => `<li><a href="/puppies?breed=${b.toLowerCase().replace(' ', '-')}">${b}</a></li>`).join('')}</ul></div>
<div class="msg them snaps" data-msg="2">${CHAT_PHOTOS.map((p) => img(p, 'Puppy photo')).join('')}</div>
<div class="msg them clip" data-msg="2"><video src="${media(CHAT_VIDEO)}" muted playsinline loop preload="none" controls></video></div>
<p class="msg them" data-msg="2">${steps[1][1]}</p>
<p class="msg them" data-msg="3">${steps[2][1]}</p>
</div>
<a class="phone-compose" href="${wa()}" target="_blank" rel="noopener"><span>Say hello on WhatsApp</span><i>➤</i></a>
</div></div></div></section>

<section class="scene passport"><div class="gutter"><div class="book reveal">
<div class="book-left"><p class="hand">puppy passport</p><h2 class="display">Why families trust TeddyPups</h2>${buddy('', 'stamp me!')}</div>
<ul class="book-right">${stamps.map(([k, icon, t, d]) => `<li><span class="stamp ${k}"><i>${icon}</i><b class="display">${t}</b></span><p>${d}</p></li>`).join('')}</ul>
</div></div>${skyline('horizon')}</section>

<section class="scene dusk"><div class="gutter dusk-head"><div><h2 class="display huge">Happy families &amp; puppies</h2>
<p class="lede">We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.</p></div>
<figure class="note reveal"><span class="tape"></span><blockquote>“${QUOTE}”</blockquote><figcaption class="hand">Sarah M., Dubai, UAE</figcaption></figure></div>
<div class="photowall gutter"><ul class="wall wall-4">${CAPTIONED.map(([s, c], i) => polaroid(s, c, i)).join('')}</ul>
<div class="center"><a class="btn btn-primary" href="/happy-families">See every happy family</a></div></div></section>

<section class="scene night"><div class="stars" aria-hidden="true">${stars(12)}</div><div class="night-grid gutter">
<div><h2 class="display huge">Questions, answered</h2><a class="btn btn-ghost light" href="/faq">Read all questions</a>${buddy('', 'hmm?')}</div>
<dl>${FAQ.slice(0, 3).map(([q, a]) => `<div class="reveal"><dt class="display">✦ ${q}</dt><dd>${a}</dd></div>`).join('')}</dl></div></section>

<section class="scene welcome"><div class="gutter center"><h2 class="display huge">Ready to meet your new best friend?</h2>
<p class="lede">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p></div>
<div class="house reveal"><span class="plant left"></span><span class="lamp"></span><div class="doorway">${img(bySlug('maltipoo-max-male').media[0].src, 'A puppy waiting at the door')}<span class="house-door"></span></div><span class="plant right"></span><span class="mat hand">welcome home</span></div>
<div class="actions gutter"><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">Enquire on WhatsApp</a><a class="btn btn-ghost light" href="/contact">Visit &amp; contact</a></div></section>`;

  return { path: '/', title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai', body, bodyClass: 'is-home' };
}

function listing() {
  const row = (label, key, options) => `<div class="filter-row"><span class="hand">${label}</span>${options.map(([v, t]) => `<button type="button" class="chip-btn" data-filter="${key}" data-value="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
  const body = `<section class="page paper-bg"><div class="gutter wrap">
<div class="page-head"><div><p class="hand kicker">from Teddy's sketchbook</p><h1 class="display giant">Available puppies${underline()}</h1>
<p class="lede">Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p></div>
<figure class="portrait">${buddy('', "that's me!")}<figcaption class="hand">self-portrait</figcaption></figure></div>
<div class="filters">
${row('where', 'origin', [['', 'Everywhere'], ['imported', 'Imported'], ['korean', 'Korean Teacup']])}
${row('breed', 'breed', [['maltipoo', 'Maltipoo'], ['pomeranian', 'Pomeranian'], ['poodle', 'Poodle'], ['cavapoo', 'Cavapoo'], ['shih-tzu', 'Shih Tzu']])}
${row('boy or girl', 'sex', [['boy', 'Boys'], ['girl', 'Girls']])}</div>
<p class="hand count" aria-live="polite"><span id="count">${available.length} puppies</span> looking for a home</p>
<ul class="sketches" id="sketches">${available.map(sketch).join('')}</ul>
<div class="empty" id="empty" hidden><p class="display">No puppies match that yet.</p><p>Tell us what you're looking for and we'll help you find your match.</p>
<button type="button" class="btn btn-ghost" id="reset">Clear filters</button> <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">Ask on WhatsApp</a></div>
</div></section>
<section class="gone-strip"><div class="gutter wrap"><div><h2 class="display big">Already gone home</h2><p>These puppies have found their families.</p><a class="btn btn-primary" href="/gone-home">See the puppies who've gone home</a></div>
<ul>${goneHome.slice(0, 5).map((p) => `<li><a href="/puppies/${p.slug}">${img(p.media[0].src, p.name)}<span class="hand">${esc(p.name)}</span></a></li>`).join('')}</ul></div></section>`;
  return { path: '/puppies', title: 'Available puppies | TeddyPups U.A.E.', body };
}

const field = (name, label, type, extra = '') => `<label class="field"><span>${label}</span><input name="${name}" type="${type}" ${extra}><small class="error" aria-live="polite"></small></label>`;

const enquiryForm = (puppyName) => `<form class="enquiry" data-form data-puppy="${esc(puppyName)}" novalidate>
<div class="two">${field('name', 'Your name *', 'text', 'required autocomplete="name"')}${field('phone', 'Phone or WhatsApp *', 'tel', 'required autocomplete="tel" placeholder="+971 50 123 4567"')}
${field('email', 'Email (optional)', 'email', 'autocomplete="email"')}${field('area', 'Your area (optional)', 'text', 'placeholder="e.g. Dubai Marina"')}</div>
<label class="field"><span>Message (optional)</span><textarea name="message" rows="4" placeholder="Anything else you'd like to tell us…"></textarea></label>
<input class="trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn btn-primary" type="submit">Send enquiry</button><p class="form-status" role="status"></p></form>`;

function puppy(p) {
  const list = p.media;
  const first = list[0];
  const gone = !p.available;
  const facts = [['Breed', p.breed], ['Boy or girl', p.sex], ['Age', p.age], ...(p.colour ? [['Colour', p.colour]] : []), ['Where', p.local ? 'In Dubai' : 'Imported for you']];
  const route = p.local
    ? ['Taking them home', [['Explore our puppies', 'Each listing includes photos, breed details, age, and health information.'], ['Choose your puppy', 'Open their profile or reach out to us directly with any questions.'], ['Meet before you choose', 'Spend time bonding before making your decision.'], ['Pick-up or delivery', 'Pick up your puppy from us or have them delivered within Dubai.']]]
    : ['Coming home from abroad', [['Reserve your puppy', 'Tell us which puppy has captured your heart.'], ['Personalized consultation', "We finalize details with you and share updates on your puppy's journey."], ['Import and arrival', 'We manage health checks, travel arrangements, and documentation.'], ['Welcome home', 'We help your new puppy settle in and ensure a smooth transition into your home.']]];
  let n = 0;
  const chapter = (text) => `<p class="chapter"><span class="display">${++n}</span><span class="hand">${text}</span></p>`;
  const label = `${esc(p.name)}`;

  const body = `<article class="page story"><div class="gutter wrap">
<nav class="crumbs" aria-label="Breadcrumb"><a href="${gone ? '/gone-home' : '/puppies'}">${gone ? 'Gone home' : 'Available puppies'}</a> / <span>${label}</span></nav>
${chapter(gone ? 'the day they went home' : "hello, it's me")}
<div class="story-grid">
<div class="gallery" data-gallery>
<div class="gallery-main"><button type="button" class="gallery-open" aria-label="Open photo full screen">${img(first.src, p.name, '')}</button>
${list.length > 1 ? `<div class="gallery-nav"><button type="button" data-step="-1" aria-label="Previous photo">‹</button><span class="gallery-count">1 / ${list.length}</span><button type="button" data-step="1" aria-label="Next photo">›</button></div>` : ''}</div>
<ul class="thumbs">${list.map((m, i) => `<li><button type="button" data-lightbox="pup" data-thumb="${i}" data-src="${sized(m.src, 1920)}"${m.video ? ` data-video="${media(m.video)}"` : ''} data-caption="${label}" aria-label="Show ${m.video ? 'video' : 'photo'} ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}>${img(m.src, '')}${m.video ? '<span>▶</span>' : ''}</button></li>`).join('')}</ul>
</div>
<div><div class="tag-card">${buddy('tag-pup', 'pick me!')}
<span class="status">${paw()} ${gone ? 'Gone home' : 'Available'}</span><h1 class="display">${label}</h1><p class="breed">${esc(p.breed)}</p>
<dl>${facts.map(([k, v]) => `<div><dt class="hand">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
<a class="btn btn-wa" href="${wa(gone ? `Hi TeddyPups, I'm looking for a puppy like ${p.name} (${p.breed}).` : `Hi TeddyPups, I'd like to know more about ${p.name} (${p.breed}, ${p.sex}).`)}" target="_blank" rel="noopener">${gone ? 'Ask about a puppy like this' : `Ask about ${label} on WhatsApp`}</a>
<a class="btn btn-ghost" href="#enquire">Send an enquiry</a></div>
<div class="paper-card">${chapter(`what comes with ${label}`)}<h2 class="display">Every Teddy Pup comes</h2>
<ul class="ticks"><li>Vaccinated</li><li>Dewormed</li><li>Verified health certificate from licensed vets</li><li>Thoroughly checked before joining your family</li></ul></div></div>
</div>
${gone ? '' : `<section class="way-home">${chapter('the way home')}<h2 class="display big">${route[0]}</h2><ol class="trail">${route[1].map(([t, d], i) => `<li class="reveal"><span class="display">${i + 1}</span><h3 class="display">${t}</h3><p>${d}</p></li>`).join('')}</ol></section>`}
<section class="letter" id="enquire"><div>${chapter('dear TeddyPups…')}<h2 class="display big">${gone ? 'Looking for a puppy like this?' : `Ask about ${label}`}</h2>
<p>Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p></div>${enquiryForm(`${p.name} (${p.breed}, ${p.sex})`)}</section>
</div></article>`;
  return { path: '/puppies', title: p.name === p.breed ? `${p.breed} puppy (${lower(p.sex)}) | TeddyPups U.A.E.` : `${p.name}, ${p.breed} puppy | TeddyPups U.A.E.`, body };
}

function families() {
  const captions = new Map(CAPTIONED);
  const all = [...MOMENTS.slice(0, 44), ...CAPTIONED.slice(0, 7).map((c) => c[0]), ...MOMENTS.slice(44, 50), CAPTIONED[7][0], ...MOMENTS.slice(50)];
  const body = `<section class="page families"><div class="gutter wrap">
<div class="page-head"><div><p class="hand kicker">our wall of happy endings</p><h1 class="display giant">Happy families ${heart()}</h1>
<p class="lede">Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>
<p class="hand">${all.length} moments and counting</p></div>
<figure class="note"><span class="tape"></span><blockquote>“${QUOTE}”</blockquote><figcaption class="hand">Sarah M., Dubai, UAE</figcaption></figure></div>
<ul class="wall masonry">${all.map((s, i) => polaroid(s, captions.get(s) || '', i)).join('')}</ul>
<div class="center end"><p class="display big">every one of them was a Teddy Pup once</p><a class="btn btn-primary" href="/puppies">See available puppies</a></div>
</div></section>`;
  return { path: '/happy-families', title: 'Happy families | TeddyPups U.A.E.', body };
}

function how() {
  const cards = (items, tag = 'h4') => items.map(([t, d]) => `<li class="reveal"><${tag} class="display">${t}</${tag}><p>${d}</p></li>`).join('');
  const body = `<section class="page how"><div class="gutter wrap">
<div class="page-head split"><h1 class="display giant">How it works</h1><p class="lede">Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p></div>
<nav class="jump" aria-label="On this page">${[['ways', 'Two ways home'], ['promise', 'Our premium puppy promise'], ['delivery', 'Delivery &amp; collection'], ['why', 'Why choose us']].map(([id, t], i) => `<a href="#${id}"><b>${i + 1}</b> ${t}</a>`).join('')}</nav>

<section id="ways" class="block"><div class="block-head"><div><p class="hand kicker">choose your way</p><h2 class="display big">Two ways home</h2></div>
<div class="toggle" role="tablist"><button type="button" role="tab" aria-selected="true" aria-controls="tab-local" data-tab="tab-local"><b class="display">In Dubai</b><small>meet in person</small></button><button type="button" role="tab" aria-selected="false" aria-controls="tab-import" data-tab="tab-import"><b class="display">Imported</b><small>order upon request</small></button></div></div>
<div id="tab-local" role="tabpanel" class="panel"><div><h3 class="display">Meet your puppy in person</h3><p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.</p>
<ol class="trail column">${cards([['Explore our puppies', 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.'], ['Choose your puppy', 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.'], ['Meet before you choose', 'Spend time bonding before making your decision.'], ['Pick-up or delivery', 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.']])}</ol></div>
<div class="postcard"><p class="hand">Downtown Dubai</p><span class="sun"></span>${skyline('skyline')}</div></div>
<div id="tab-import" role="tabpanel" class="panel" hidden><div><h3 class="display">Order upon request</h3><p>Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.</p>
<p>From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.</p>
<ol class="trail column">${cards([['Reserve your puppy', 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.'], ['Personalized consultation', "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey."], ['Import and arrival', 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.'], ['Welcome home', 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.']])}</ol></div>
<div class="postcard"><p class="hand">Korea → Dubai</p><span class="sun"></span><span class="plane-glyph">✈</span></div></div></section>

<section id="promise" class="block promise"><p class="hand kicker">puppy passport</p><h2 class="display big">Our premium puppy promise</h2><ul class="cards three">${['We work only with breeders who uphold the highest ethical and health standards.', 'Photos, videos, and health certificates are shared before your puppy travels.', 'We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.'].map((t) => `<li class="reveal">${paw()}<p>${t}</p></li>`).join('')}</ul></section>

<section id="delivery" class="block"><h2 class="display big">Delivery &amp; collection</h2><p class="lede">From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p><ul class="cards four">${cards([['Take your puppy home the same day', 'Local puppies are available immediately — visit, fall in love, and go home together.'], ['Delivery within Dubai', 'Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.'], ['Safe international cargo', 'We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.'], ['Worldwide delivery', 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.']], 'h3')}</ul></section>

<section id="why" class="block"><h2 class="display big">Why choose us</h2><p class="lede">We're here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we're with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.</p>
<ul class="cards three">${cards([['International cargo', 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.'], ['Support 24/7', 'Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we’re just a message away.'], ['Health guarantee', 'All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.']], 'h3')}</ul></section>

<section class="block center"><h2 class="display big">Unique and high quality puppies</h2><p class="lede">When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.</p>
<div class="actions"><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">Ask us on WhatsApp</a><a class="btn btn-ghost" href="/puppies">See available puppies</a></div></section>
</div></section>`;
  return { path: '/how-it-works', title: 'How it works | TeddyPups U.A.E.', body };
}

function faq() {
  const body = `<section class="page faq"><div class="gutter wrap">
<h1 class="display giant">Questions &amp; answers</h1><p class="lede">Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.</p>
<div class="faq-grid"><aside><label class="hand" for="faq-search">sniff out a question</label>
<input id="faq-search" type="search" placeholder="delivery, Korea, vaccinated…"><p id="faq-count" aria-live="polite">${FAQ.length} notes on the board</p>
${buddy('', '?')}<a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">Ask your own question</a></aside>
<div class="board">${FAQ.map(([q, a]) => `<details class="pin-note"><summary class="display">${q}</summary><p>${a}</p></details>`).join('')}<p id="faq-empty" hidden>Nothing on the board matches. Ask us on WhatsApp instead.</p></div></div>
</div></section>`;
  return { path: '/faq', title: 'Questions & answers | TeddyPups U.A.E.', body };
}

function contact() {
  const blank = (name, type, placeholder, label, extra = '') => `<input class="blank" name="${name}" type="${type}" placeholder="${placeholder}" aria-label="${label}" ${extra}>`;
  const body = `<section class="page contact"><div class="gutter wrap">
<div class="page-head split"><h1 class="display giant">Get in touch with us</h1><p class="lede">Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!</p></div>
<div class="contact-grid">
<div><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">WhatsApp ${SITE.phone}</a>
<dl><dt class="hand">call us</dt><dd><a href="tel:${SITE.tel}">${SITE.phone}</a></dd><dt class="hand">email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></dl>
<div class="visit"><h2 class="display">Visit us in Downtown Dubai</h2><p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p><p><b>Downtown Dubai, United Arab Emirates</b></p>
<a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=Downtown+Dubai" target="_blank" rel="noopener">Open in Google Maps</a></div></div>
<form class="letter-form" data-form novalidate><span class="postage">${paw()}</span><p class="hand greeting">Dear TeddyPups,</p>
<p class="prose">my name is ${blank('name', 'text', '', 'Your name', 'required autocomplete="name"')}, and you can reach me on ${blank('phone', 'tel', '+971 50 123 4567', 'Phone or WhatsApp', 'required autocomplete="tel"')} or by email at ${blank('email', 'email', 'optional', 'Email (optional)', 'autocomplete="email"')}.</p>
<p class="prose">I live in ${blank('area', 'text', 'e.g. Dubai Marina', 'Your area (optional)')}, and I'm curious about <select class="blank" name="puppy" aria-label="Puppy you're interested in (optional)"><option value="">any puppy (not sure yet)</option>${available.map((p) => `<option>${esc(p.name)} (${p.name !== p.breed ? `${esc(p.breed)}, ` : ''}${lower(p.sex)})</option>`).join('')}</select>.</p>
<textarea name="message" rows="4" placeholder="Anything else you'd like to tell us…" aria-label="Your message (optional)"></textarea>
<input class="trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<p class="hand signoff">with love, a future puppy parent</p><button class="btn btn-primary" type="submit">Post my letter</button><p class="form-status" role="status"></p></form>
</div></div></section>`;
  return { path: '/contact', title: 'Visit & contact | TeddyPups U.A.E.', body };
}

function gone() {
  const body = `<section class="page"><div class="gutter wrap">
<div class="page-head"><div><h1 class="display giant">Gone home ${heart()}</h1><p class="lede">Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.</p><a class="btn btn-primary" href="/puppies">See available puppies</a></div>
<figure class="booth">${buddy('', 'all aboard!')}<figcaption class="display">tickets home</figcaption></figure></div>
<ul class="sketches">${goneHome.map(sketch).join('')}</ul></div></section>`;
  return { path: '/gone-home', title: 'Gone home | TeddyPups U.A.E.', body };
}

function notFound() {
  const body = `<section class="page center"><div class="gutter wrap">${buddy('big-pup', 'ruff?')}<h1 class="display huge">This page wandered off</h1><p class="lede">We couldn't find what you were looking for.</p><a class="btn btn-primary" href="/">Back home</a></div></section>`;
  return { path: '/404', title: 'Page not found | TeddyPups U.A.E.', body };
}

module.exports = { home, listing, puppy, families, how, faq, contact, gone, notFound };
