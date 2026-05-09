document.querySelectorAll('[data-faq]').forEach((faq) => {
  const navItems = faq.querySelectorAll('[data-target]');
  const categories = faq.querySelectorAll('[data-cat]');
  if (!navItems.length || !categories.length) return;

  const activate = (id) => {
    navItems.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.target === id));
    categories.forEach((cat) => cat.classList.toggle('is-hidden', cat.dataset.cat !== id));
  };

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.dataset.target));
  });

  activate(navItems[0].dataset.target);
});
