'use strict';

/* global Item bookmark-list bookmarkList */

// local storage
const store = (function () {

  const addItem = function(item) {
    this.items.push(Object.assign(item, {expanded: false}));
  };

  // const addItem = function(Item) {
  //   Item.validateName(title);
  //   api.createItem(item);
  //   try{
  //     api.createItem(item, response => console.log(response));
  //   }catch(e) {
  //     console.log(e.message);
  //   }
  // };

  // Find and delete item from AJAX
  const findAndDelete = function(id) {

    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    items:[],

    addItem,
    findAndDelete,

  };

}() );
