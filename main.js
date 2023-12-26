const initApp = () => {
  const itemForm = document.getElementById('item-form');
  const itemInput = document.getElementById('item-input');
  const itemList = document.getElementById('item-list');
  const clearItemsBtn = document.getElementById('clear');
  const itemFilter = document.getElementById('filter');
  const formBtn = itemForm.querySelector('button');

  // ADD ITEM
  function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if (!newItem) return;

    renderItem(newItem);
  }

  // RENDER ITEM
  function renderItem(item) {
    const li = document.createElement('li');
    const button = createButton('remove-item btn-link text-red');

    li.appendChild(document.createTextNode(item));
    li.appendChild(button);

    itemList.appendChild(li);
  }

  /**************************
   * ::: HELPER FUNCTIONS :::
   **************************/
  // CREATE BUTTON
  function createButton(className) {
    const button = document.createElement('button');
    const icon = createIcon('fa-solid fa-xmark');

    button.className = className;
    button.appendChild(icon);

    return button;
  }

  // CREATE ICON
  function createIcon(className) {
    const icon = document.createElement('i');
    icon.className = className;

    return icon;
  }

  /**************************
   * ::: EVENT LISTENERS :::
   **************************/
  itemForm.addEventListener('submit', addItem);
};

document.addEventListener('DOMContentLoaded', initApp);
