document.querySelectorAll('[data-h-scroll]').forEach((section) => {
  const track = section.querySelector('[data-scroll-track]');
  const prev = section.querySelector('[data-scroll-prev]');
  const next = section.querySelector('[data-scroll-next]');
  const progress = section.querySelector('[data-scroll-progress]');
  if (!track) return;

  const scrollByCard = (dir) => {
    const card = track.querySelector('.h-scroll__card');
    if (!card) return;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0);
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    if (progress) {
      progress.style.width = max <= 0 ? '100%' : `${Math.min(100, Math.max(0, (track.scrollLeft / max) * 100))}%`;
    }
    if (prev) prev.disabled = track.scrollLeft <= 1;
    if (next) next.disabled = max <= 1 || track.scrollLeft >= max - 1;
  };

  if (prev) prev.addEventListener('click', () => scrollByCard(-1));
  if (next) next.addEventListener('click', () => scrollByCard(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
