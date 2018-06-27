'use strict';

/* global store bookmark-list */


// IIFE
// declare a const BASE_URL = constant containing
//  the API will keep all items under this name separate from others.)
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/albertf/bookmarks';

  // const getItems = function (callback){
  //   $.ajax({
  //     'url': `${BASE_URL}`,
  //     'method': 'GET',
  //     'contentType': 'application/json',
  //     'success': callback,
  //   });
  // };
  const getItems = function(callback) {
    $.getJSON(BASE_URL, callback);
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

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  const deleteItem = function (id, callback){

    $.ajax({
      'url': `${BASE_URL}/${id}`,
      'method': 'DELETE',
      'success': callback,
    });
  };



  return{
    getItems,
    createItem,
    updateItem,
    deleteItem
  };

}());
