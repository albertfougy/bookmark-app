'use strict';

/* global  bookmark bookmark-list */


// IIFE
// declare a const BASE_URL = constant containing
//  the API will keep all items under this name separate from others.)
const api = (function(title){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/albertf/bookmarks';

  const getItems = function (callback){
    $.ajax({
      'url': `${BASE_URL}`,
      'method': 'GET',
      'contentType': 'application/json',
      'success': callback,
    });

  };

  const createItem = function (item, callback){
    const newItem = JSON.stringify(item);

    $.ajax({
      'url': `${BASE_URL}`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newItem,
      'success': callback,
    });
  };

  const deleteItem = function (id, callback){
  //  const deleteItem = JSON.stringify(item);

    $.ajax({
      'url': `${BASE_URL}/${id}`,
      'method': 'DELETE',
      'contentType': 'application/json',
    //  'data': deleteItem,
      'success': callback,
    });
  };



  return{
    getItems,
    createItem,
    deleteItem
  };

}());
