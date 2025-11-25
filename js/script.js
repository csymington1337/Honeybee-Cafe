//mobile layout menu
document.addEventListener('DOMContentLoaded', () => {
  const honeycomb = document.querySelector('#header .menu-icon');
  const menu = document.querySelector('#header .nav-links ul');
  const menuLinks = document.querySelectorAll('#header .nav-links ul li a');

  if (!honeycomb || !menu) return;

  const isOpen = () => menu.classList.contains('active');

  function openMenu() {
    menu.classList.add('active');
    honeycomb.classList.add('active');
    honeycomb.setAttribute('aria-expanded', 'true');
    honeycomb.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    menu.classList.remove('active');
    honeycomb.classList.remove('active');
    honeycomb.setAttribute('aria-expanded', 'false');
    honeycomb.setAttribute('aria-label', 'Open menu');
    // return focus to trigger if closed via keyboard
    if (document.activeElement && !honeycomb.contains(document.activeElement)) {
      honeycomb.focus();
    }
  }

  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  //Click to open/close
  honeycomb.addEventListener('click', toggleMenu);

  //Click a link -> close
  menuLinks.forEach(a => a.addEventListener('click', closeMenu));

  //Escape to close
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
      e.preventDefault();
      closeMenu();
    }
  });

});

//Daily special auto display
const specialDays = document.querySelectorAll('.special-item');

  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = daysOfWeek[today];

  //function to show special for appropriate weekday
  function showSpecial(dayName) {

    // Hide all special days
    specialDays.forEach(day => {
      day.classList.remove('active');
    });

    // Show selected day
    const selectedDay = document.querySelector(`.special-item[data-day="${dayName}"]`);
    if (selectedDay) {
      selectedDay.classList.add('active');
    }

}

showSpecial(currentDay);