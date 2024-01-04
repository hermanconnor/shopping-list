'use strict';

const initApp = () => {
  const itemForm = document.getElementById('item-form');
  const itemInput = document.getElementById('item-input');
  const itemList = document.getElementById('item-list');
  const clearItemsBtn = document.getElementById('clear');
  const itemFilter = document.getElementById('filter');
  const formBtn = itemForm.querySelector('button');
  let isEditMode = false;

  // Get items from storage and display
  displayItems();

  // ADD ITEM
  function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if (!newItem) return;

    if (checkForDuplicates(newItem)) {
      alert('Item already exists');
      return;
    }

    if (isEditMode) {
      const itemToEdit = itemList.querySelector('.edit-mode');

      if (checkForDuplicates(itemToEdit.textContent)) {
        alert('Item already exists');
        return;
      }

      removeItemFromStorage(itemToEdit.textContent);

      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();

      isEditMode = false;
    }

    renderItem(newItem);

    addItemToStorage(newItem);

    setDefaultUI();

    itemForm.reset();
  }

  // DELETE ITEM
  function deleteItem(item) {
    if (confirm('Are you sure you want to delete this item?')) {
      item.remove();

      removeItemFromStorage(item.textContent);

      setDefaultUI();
    }
  }

  function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
      deleteItem(e.target.parentElement.parentElement);
    }

    if (e.target.tagName === 'LI') {
      setItemToEdit(e.target);
    }
  }

  // SET EDIT
  function setItemToEdit(item) {
    isEditMode = true;

    itemList
      .querySelectorAll('li')
      .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228b22';
    itemInput.value = item.textContent;
  }

  // RENDER ITEM
  function renderItem(item) {
    const li = document.createElement('li');
    const button = createButton('remove-item btn-link text-red');

    li.appendChild(document.createTextNode(item));
    li.appendChild(button);

    itemList.appendChild(li);
  }

  // FILTER ITEMS
  function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const searchText = e.target.value.toLowerCase();

    items.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();

      if (itemName.includes(searchText)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // CLEAR ITEMS
  function clearItems() {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem('items');

    setDefaultUI();
  }

  function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach((item) => renderItem(item));

    setDefaultUI();
  }

  // SET UI BACK TO DEFAULT
  function setDefaultUI() {
    itemForm.reset();

    const items = itemList.querySelectorAll('li');

    items.forEach((item) => {
      item.style.display = 'flex';
      item.classList.remove('edit-mode');
    });

    if (!items.length) {
      clearItemsBtn.style.display = 'none';
      itemFilter.style.display = 'none';
      localStorage.removeItem('items');
    } else {
      clearItemsBtn.style.display = 'block';
      itemFilter.style.display = 'block';
    }

    itemFilter.value = '';
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
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

  // REMOVE ITEM FROM STORAGE
  function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }

  // CHECK FOR DUPLICATE LIST ITEMS
  function checkForDuplicates(item) {
    return getItemsFromStorage().includes(item);
  }

  /**************************
   * ::: EVENT LISTENERS :::
   **************************/
  itemForm.addEventListener('submit', addItem);
  clearItemsBtn.addEventListener('click', clearItems);
  itemList.addEventListener('click', onClickItem);
  itemFilter.addEventListener('input', filterItems);
};

document.addEventListener('DOMContentLoaded', initApp);
