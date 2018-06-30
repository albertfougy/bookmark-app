'use strict';

/* global  bookmark-list bookmarkList */

// // local storage
// const store = (function () {

//   // const addItem = function(item) {
//   //   this.items.push(Object.assign(item, {expanded: false}));
//   // };

//   const addItem = function(Item) {
//     Item.validateName(name);
//     api.createItem(item);
//     try{
//       api.createItem(item, response => console.log(response));
//     }catch(e) {
//       console.log(e.message);
//     }
//   };

//   // Find and delete item from AJAX
//   const findAndDelete = function(id) {
//     this.items = this.items.filter(item => item.id !== id);
//   };

//   return {
//     items:[],
//     add: false,

//     addItem,
//     findAndDelete,

//   };

// }() );

// // local storage
const store = (function() {

  const addItem = function(item) {
    this.items.push(Object.assign(item, {expanded: false}));
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };


  function filterByRating(val) {
    this.items = this.items.filter( item => {
      return item.rating >= val;
    });
  }

  return {
    items: [],
    add: false,
    error: null,

    addItem,
    findById,
    findAndDelete,
    filterByRating

  };

}());