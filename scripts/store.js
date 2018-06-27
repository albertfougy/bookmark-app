'use strict';

/* global Item bookmark-list*/

// local storage
const store = (function () {
// const validateName

  const addItem = function(item) {
    Item.validateName(title);
    api.createItem(item);
    try{
      api.createItem(item, response => console.log(response));
    }catch(e) {
      console.log(e.message);
    }
  };

  // Find and delete item from AJAX
  const findAndDelete = function(id) {

    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    addItem,
    findAndDelete,

  };

}() );
