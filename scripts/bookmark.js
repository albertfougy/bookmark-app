'use strict';

/* global Item bookmark-list*/

// local storage
const bookmark = (function () {
// const validateName

  const addItem = function(item) {
    Item.validateName(title);
    api.createItem(item);
    try{
      api.createItem(item, response => console.log(reponse));
    }catch(e) {
      console.log(e.message);
    }
  };

  // Find and delete item from AJAX
  const findAndDelete = function(id) {

  this.items = this.items.filter(item => item.id !== id);
};

return {
    findAndDelete,
    addItem
}

}() );
