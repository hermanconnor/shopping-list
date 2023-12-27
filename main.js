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

    addItemToStorage(newItem);
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

  // ADD ITEM TO LOCALSTORAGE
  function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }

  // GET ITEMS FROM LOCALSTORAGE
  function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
  }

  /**************************
   * ::: EVENT LISTENERS :::
   **************************/
  itemForm.addEventListener('submit', addItem);
};

document.addEventListener('DOMContentLoaded', initApp);
