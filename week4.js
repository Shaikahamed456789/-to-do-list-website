(() => {
  // State variables
  let toDoListArray = [];
  // UI variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // Event listeners
  form.addEventListener('submit', e => {
    // Prevent default behavior - Page reload
    e.preventDefault();
    // Give item a unique ID
    let itemId = String(Date.now());
    // Get/assign input value
    let toDoItem = input.value;
    // Pass ID and item into functions
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    // Clear the input box (this is default behavior but we got rid of that)
    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id');
    if (!id) return; // User clicked on something else
    // Check if the clicked element is the list item itself or its children
    let clickedElement = e.target.closest('li');
    if (clickedElement) {
      // Toggle the 'completed' class on the list item
      clickedElement.classList.toggle('completed');
      // Update the toDoListArray to reflect the completion status of the task
      updateItemInArray(id, clickedElement.classList.contains('completed'));
    }
  });

  ul.addEventListener('dblclick', e => {
    let id = e.target.getAttribute('data-id');
    if (!id) return; // User clicked on something else
    // Check if the clicked element is the list item itself or its children
    let clickedElement = e.target.closest('li');
    if (clickedElement) {
      // Make the list item editable
      clickedElement.contentEditable = true;
      // When the user finishes editing, update the task in the toDoListArray
      clickedElement.addEventListener('blur', () => {
        let editedTask = clickedElement.innerText;
        updateItemInArray(id, editedTask);
        clickedElement.contentEditable = false;
      });
    }
  });

  ul.addEventListener('contextmenu', e => {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    if (!id) return; // User clicked on something else
    // Remove the task from the DOM and the toDoListArray
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  // Functions
  function addItemToDOM(itemId, toDoItem) {
    // Create an li
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);
    // Add toDoItem text to li
    li.innerText = toDoItem;
    // Add li to the DOM
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    // Add item to array as an object with an ID so we can find and delete it later
    toDoListArray.push({ itemId, toDoItem, completed: false });
    console.log(toDoListArray);
  }

  function removeItemFromDOM(id) {
    // Get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    // Remove list item
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    // Create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

  function updateItemInArray(id, editedTask) {
    // Find the item in the array and update its toDoItem property
    let itemToUpdate = toDoListArray.find(item => item.itemId === id);
    if (itemToUpdate) {
      itemToUpdate.toDoItem = editedTask;
      console.log(toDoListArray);
    }
  }
})();
