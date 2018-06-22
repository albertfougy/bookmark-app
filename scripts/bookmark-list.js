'use strict';

/* global bookmark */

const bookmarkList = (function(){

  function generateItemElement(item) {
    return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${item.title} ${item.desc} ${item.rating}
      <div class="bookmark-item-controls">
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;

  }


  function render() {
    api.getItems(items => {
      let  bookmarkListItemsString =''  ;
      items.forEach(item => {
        bookmarkListItemsString += generateItemElement(item);
      });
      $('.js-bookmark-list').html(bookmarkListItemsString);
    });
  }


  function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
}

  // Delete item from list
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in api.items
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      // delete the item
      api.deleteItem( id, function() {
              render();
      });
    });
  }




  return {
    render: render,
    handleDeleteItemClicked
  };
}());
