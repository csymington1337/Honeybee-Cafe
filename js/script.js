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

//One details section of menu open at a time
document.querySelectorAll('#menu .menu-container details').forEach((details) => {
  details.addEventListener('toggle', function () {
    if (details.open) {
      document.querySelectorAll('#menu .menu-container details').forEach((other) => {
        if (other !== details) other.open = false;
      });
      // Scroll to the heading text
      const heading = document.querySelector('.heading-text');
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Utility: Get next available index for new order items
function getNextOrderIndex() {
  const items = document.querySelectorAll('#order-items .order-item');
  return items.length + 1;
}

// Add a new order item block, optionally pre-selecting variety/size
function addOrderItem(selectedValue = '') {
  const index = getNextOrderIndex();
  const orderItems = document.getElementById('order-items');

  // Create order-item container
  const itemDiv = document.createElement('div');
  itemDiv.className = 'order-item';

  // Variety & Size row
  const varietyRow = document.createElement('div');
  varietyRow.className = 'order-item-row';
  const varietyLabel = document.createElement('label');
  varietyLabel.setAttribute('for', `variety-${index}`);
  varietyLabel.textContent = 'Variety & Size:';
  const varietySelect = document.createElement('select');
  varietySelect.id = `variety-${index}`;
  varietySelect.name = 'variety[]';
  varietySelect.innerHTML = `
    <option value="">Select an option</option>
    <option value="wildflower-250">Wildflower 250g</option>
    <option value="wildflower-500">Wildflower 500g</option>
    <option value="clover-250">Clover 250g</option>
    <option value="clover-500">Clover 500g</option>
    <option value="buckwheat-250">Buckwheat 250g</option>
    <option value="buckwheat-500">Buckwheat 500g</option>
    <option value="lavender-250">Lavender 250g</option>
    <option value="lavender-500">Lavender 500g</option>
    <option value="cinnamon-250">Cinnamon 250g</option>
    <option value="cinnamon-500">Cinnamon 500g</option>
  `;
  if (selectedValue) varietySelect.value = selectedValue;
  varietyRow.appendChild(varietyLabel);
  varietyRow.appendChild(varietySelect);

  // Quantity row
  const quantityRow = document.createElement('div');
  quantityRow.className = 'order-item-row';
  const quantityLabel = document.createElement('label');
  quantityLabel.setAttribute('for', `quantity-${index}`);
  quantityLabel.textContent = 'Quantity:';
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.id = `quantity-${index}`;
  quantityInput.name = 'quantity[]';
  quantityInput.min = '1';
  quantityInput.value = '1';
  quantityRow.appendChild(quantityLabel);
  quantityRow.appendChild(quantityInput);

  // Assemble
  itemDiv.appendChild(varietyRow);
  itemDiv.appendChild(quantityRow);
  orderItems.appendChild(itemDiv);
}

// "Add another item" button functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initial setup: If no order-item exists, add one
  if (!document.querySelector('#order-items .order-item')) {
    addOrderItem();
  }

  // Add item button
  const addBtn = document.querySelector('#order .button[type="button"]');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      addOrderItem();
    });
  }

  // Auto-fill from menu order buttons
  document.querySelectorAll('.honey-table .button[data-honey]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedValue = btn.getAttribute('data-honey');
      // Find first empty variety selector
      const emptySelect = Array.from(document.querySelectorAll('#order-items select[name="variety[]"]'))
        .find(sel => !sel.value);
      if (emptySelect) {
        emptySelect.value = selectedValue;
      } else {
        addOrderItem(selectedValue);
      }
      document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// Mapping for display names
const honeyDisplayNames = {
  "wildflower-250": "Wildflower 250g",
  "wildflower-500": "Wildflower 500g",
  "clover-250": "Clover 250g",
  "clover-500": "Clover 500g",
  "buckwheat-250": "Buckwheat 250g",
  "buckwheat-500": "Buckwheat 500g",
  "lavender-250": "Lavender 250g",
  "lavender-500": "Lavender 500g",
  "cinnamon-250": "Cinnamon 250g",
  "cinnamon-500": "Cinnamon 500g"
};

//Save data for confirmation page
document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Collect order items
      const varieties = Array.from(document.querySelectorAll('select[name="variety[]"]')).map(sel => sel.value);
      const quantities = Array.from(document.querySelectorAll('input[name="quantity[]"]')).map(inp => inp.value);

      // Collect customer info (use correct IDs)
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      // Save to sessionStorage
      sessionStorage.setItem('orderVarieties', JSON.stringify(varieties));
      sessionStorage.setItem('orderQuantities', JSON.stringify(quantities));
      sessionStorage.setItem('customerName', firstName + ' ' + lastName);
      sessionStorage.setItem('customerEmail', email);
      sessionStorage.setItem('customerPhone', phone);

      // Redirect to confirmation page
      window.location.href = 'order-confirmation.html';
    });
  }

  // CONFIRMATION PAGE: Display data
  if (document.getElementById('order-summary')) {
    document.getElementById('customer-name').textContent = sessionStorage.getItem('customerName') || '';
    document.getElementById('customer-email').textContent = sessionStorage.getItem('customerEmail') || '';
    document.getElementById('customer-phone').textContent = sessionStorage.getItem('customerPhone') || '';

    const varieties = JSON.parse(sessionStorage.getItem('orderVarieties') || '[]');
    const quantities = JSON.parse(sessionStorage.getItem('orderQuantities') || '[]');
    const summaryList = document.getElementById('order-summary');
    summaryList.innerHTML = '';
    for (let i = 0; i < varieties.length; i++) {
      if (varieties[i]) {
        const displayName = honeyDisplayNames[varieties[i]] || varieties[i];
        const li = document.createElement('li');
        li.textContent = `${displayName} — Quantity: ${quantities[i]}`;
        summaryList.appendChild(li);
      }
    }
  }
});