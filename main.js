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

    const li = document.createElement('li');
    const button = document.createElement('button');
    const icon = document.createElement('i');

    button.className = 'remove-item btn-link text-red';
    icon.className = 'fa-solid fa-xmark';

    button.appendChild(icon);
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(button);

    itemList.appendChild(li);
  }

  /**************************
   * ::: EVENT LISTENERS :::
   **************************/
  itemForm.addEventListener('submit', addItem);
};

document.addEventListener('DOMContentLoaded', initApp);
