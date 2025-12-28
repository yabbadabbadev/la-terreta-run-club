const initHeaderToggle = () => {
  const toggleBtn = document.querySelector('.header__toggle');
  const navMenu = document.querySelector('.header__nav');

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('header__nav--open');
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderToggle();
});
