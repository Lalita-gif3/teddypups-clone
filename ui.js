// Shared markup: icons, mascot, header, footer and page shell.
const { SITE } = require('./data');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const media = (p) => `${SITE.mediaHost}/media/${p}`;
// Resized copy served by the reference site's image optimizer.
const sized = (p, w = 640) => `${SITE.mediaHost}/_next/image?url=${encodeURIComponent(`/media/${p}`)}&w=${w}&q=75`;
const LOGO = `${SITE.mediaHost}/brand/logo.png`;
const wa = (text = SITE.waText) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const img = (p, alt, attrs = 'loading="lazy"') => `<img src="${sized(p)}" alt="${esc(alt)}" ${attrs} decoding="async">`;

const paw = (cls = '') => `<svg class="paw ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><ellipse cx="12" cy="16" rx="5.5" ry="4.6"/><circle cx="4.5" cy="10.5" r="2.4"/><circle cx="9" cy="6" r="2.5"/><circle cx="15" cy="6" r="2.5"/><circle cx="19.5" cy="10.5" r="2.4"/></svg>`;

// Original hand-drawn puppy mascot.
const pupSvg = () => `<svg class="pup" viewBox="0 0 120 100" aria-hidden="true">
<g stroke="#2a170e" stroke-width="2.2" fill="#f2be6b" stroke-linejoin="round">
<ellipse cx="60" cy="96" rx="40" ry="3" fill="#2a170e" opacity=".12" stroke="none"/>
<g class="pup-tail"><circle cx="17" cy="50" r="9"/><path d="M22 56l10 8" fill="none"/></g>
<g class="pup-leg a"><rect x="30" y="70" width="11" height="25" rx="5.5"/></g>
<g class="pup-leg b"><rect x="62" y="70" width="11" height="25" rx="5.5"/></g>
<ellipse cx="52" cy="68" rx="30" ry="18"/>
<g class="pup-leg b"><rect x="43" y="72" width="11" height="24" rx="5.5"/></g>
<g class="pup-leg a"><rect x="73" y="72" width="11" height="24" rx="5.5"/></g>
<g class="pup-head">
<ellipse cx="62" cy="43" rx="11" ry="19" fill="#dc9a4c"/><ellipse cx="104" cy="43" rx="11" ry="19" fill="#dc9a4c"/>
<circle cx="83" cy="36" r="25"/><circle cx="83" cy="12" r="9"/>
<ellipse cx="83" cy="46" rx="13" ry="10" fill="#fbe3b4" stroke="none"/>
<g fill="#2a170e" stroke="none"><circle class="pup-eye" cx="74" cy="34" r="3.2"/><circle class="pup-eye" cx="92" cy="34" r="3.2"/><ellipse cx="83" cy="43" rx="4.5" ry="3.2"/></g>
<path d="M77 49q6 6 12 0" fill="none"/>
<g fill="#f0a08a" stroke="none" opacity=".6"><circle cx="68" cy="44" r="4"/><circle cx="98" cy="44" r="4"/></g>
</g>
<path d="M66 59q17 10 34 0" fill="none" stroke="#a24a1a" stroke-width="5"/>
</g></svg>`;

const buddy = (cls = '', say = 'woof!') => `<button type="button" class="buddy ${cls}" data-say="${esc(say)}" aria-label="Pet the puppy">${pupSvg()}<span class="bubble" aria-hidden="true">${esc(say)}</span></button>`;

const underline = () => `<svg class="underline" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9C40 2 70 12 110 8s80-7 120-1 50 2 67-1" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`;

const heart = () => `<svg class="heart" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20S3 14.5 3 8.5A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 9 2.5C21 14.5 12 20 12 20Z"/></svg>`;

const stars = (n) => Array.from({ length: n }, (_, i) => `<i class="star" style="left:${(i * 37 + 7) % 97}%;top:${(i * 53 + 11) % 91}%;animation-delay:${(i % 7) * 0.4}s">✦</i>`).join('');

const NAV = [['/', 'Home'], ['/puppies', 'Puppies'], ['/happy-families', 'Happy families'], ['/how-it-works', 'How it works'], ['/faq', 'FAQ'], ['/contact', 'Visit &amp; contact']];

const navLinks = (path) => NAV.map(([href, label]) => {
  const on = href === '/' ? path === '/' : path.startsWith(href);
  return `<li><a class="nav-link" href="${href}"${on ? ' aria-current="page"' : ''}><span>${label}</span>${paw()}</a></li>`;
}).join('');

const header = (path) => `<header class="header">
<div class="header-bar gutter">
<a class="brand" href="/"><img src="${LOGO}" alt="" width="52" height="52"><span class="display">TeddyPups</span></a>
<nav class="nav" aria-label="Main"><ul>${navLinks(path)}</ul></nav>
<div class="header-end"><a class="btn btn-wa header-wa" href="${wa()}" target="_blank" rel="noopener">WhatsApp us</a>
<button type="button" class="menu-btn" data-open="menu">${paw()} Menu</button></div>
</div></header>
<dialog id="menu" class="menu"><div class="menu-inner gutter">
<div class="menu-top"><span class="hand">where to, friend?</span><button type="button" class="pill-dark" data-close>Close</button></div>
<nav aria-label="Mobile"><ul>${navLinks(path)}</ul></nav>
<div class="menu-foot"><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">WhatsApp us</a><p>${SITE.phone}</p></div>
</div></dialog>`;

const footer = () => `<footer class="footer">
<div class="stars" aria-hidden="true">${stars(9)}<span class="moon"></span></div>
<div class="footer-grid gutter">
<div class="footer-about"><p class="display footer-big">Home, at last.</p>
<p>TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
<div class="basket">${buddy('', 'zzz…')}<span class="basket-front"></span></div></div>
<nav aria-label="Footer"><h2 class="hand">Explore</h2><ul>
<li><a href="/puppies">Available puppies</a></li><li><a href="/gone-home">Gone home</a></li><li><a href="/happy-families">Happy families</a></li>
<li><a href="/how-it-works">How it works</a></li><li><a href="/how-it-works#delivery">Delivery &amp; collection</a></li><li><a href="/faq">FAQ</a></li><li><a href="/contact">Visit &amp; contact</a></li></ul></nav>
<div><h2 class="hand">Say hello</h2><ul>
<li><a href="${wa()}" target="_blank" rel="noopener">WhatsApp ${SITE.phone}</a></li>
<li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li>Downtown Dubai, United Arab Emirates</li></ul>
<ul class="socials">${['Instagram', 'TikTok', 'Facebook'].map((s) => `<li><a href="${SITE.social}" target="_blank" rel="noopener">${s}</a></li>`).join('')}</ul></div>
</div>
<div class="footer-base gutter"><span><img src="${LOGO}" alt="" width="36" height="36" loading="lazy"> © 2026 TeddyPups U.A.E.</span><span class="hand">every puppy is family</span></div>
</footer>
<div class="mobile-bar"><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">WhatsApp us</a><a class="btn btn-ghost" href="tel:${SITE.tel}">Call</a></div>`;

const curtain = () => `<div class="curtain" aria-hidden="true"><div class="curtain-runner">${pupSvg()}</div><p class="hand">every puppy is family</p></div>`;

const lightbox = () => `<dialog id="lightbox" class="lightbox" aria-label="Photo viewer"><button type="button" class="lb-close" data-close>Close</button>
<button type="button" class="lb-nav prev" aria-label="Previous">‹</button><figure><div class="lb-stage"></div><figcaption class="hand"></figcaption></figure>
<button type="button" class="lb-nav next" aria-label="Next">›</button></dialog>`;

const layout = ({ path, title, description, body, bodyClass = '' }) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(description || 'Premium teacup puppies in Dubai.')}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#fffdf8">
<link rel="icon" href="${LOGO}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400..800&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..900,0..100,0..1&family=Shantell+Sans:wght@400..700&display=swap">
<link rel="stylesheet" href="/styles.css">
</head><body class="${bodyClass}">
${path === '/' ? curtain() : ''}
<a class="skip" href="#main">Skip to content</a>
${header(path)}
<main id="main" tabindex="-1">${body}</main>
${footer()}
${lightbox()}
<script src="/app.js" defer></script>
</body></html>`;

module.exports = { esc, media, sized, img, wa, paw, pupSvg, buddy, underline, heart, stars, layout };
