const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Otwórz menu'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu'); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
if (matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
 document.querySelectorAll('.button').forEach(button => button.addEventListener('pointermove', event => { const rect = button.getBoundingClientRect(); button.style.setProperty('--x', `${event.clientX - rect.left}px`); button.style.setProperty('--y', `${event.clientY - rect.top}px`); }));
}
document.querySelectorAll('button.lesson').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('button.lesson').forEach(cell => { cell.classList.remove('selected'); cell.setAttribute('aria-pressed', 'false'); });
 button.classList.add('selected');
 button.setAttribute('aria-pressed', 'true');
 document.querySelector('#selected-subject').textContent = `${button.dataset.subject} ${button.dataset.time.split(' ')[0]}`;
 document.querySelector('#selected-location-text').textContent = button.dataset.location;
}));
const featuredVideo = document.querySelector('[data-featured-video]');
if (featuredVideo) {
 const video = featuredVideo.querySelector('video');
 const showVideo = () => featuredVideo.classList.add('is-ready');
 if (video.readyState >= 2) showVideo();
 else video.addEventListener('loadeddata', showVideo, { once: true });
}
const search = document.querySelector('#update-search');
if (search) {
 let category = 'Wszystkie';
 const normalize = text => text.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
 function filter() { let count = 0; document.querySelectorAll('.update-row').forEach(row => { row.hidden = !((category === 'Wszystkie' || row.dataset.category === category) && normalize(row.textContent).includes(normalize(search.value.trim()))); if (!row.hidden) count++; }); document.querySelector('#no-results').hidden = count !== 0; document.querySelector('#search-status').textContent = `${count} ${count === 1 ? 'wpis' : 'wpisy'}`; }
 search.addEventListener('input', filter);
 document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); filter(); }));
}
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
 document.querySelectorAll('.feature-card,.mission-card,.mission-copy,.manifesto,.person,.featured-update').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
}
