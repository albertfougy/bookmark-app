'use strict';
/* global  api store  bookmarkList  */

$(document).ready(function() {

  api.getItems(items=> {
    items.forEach(item => {
      store.addItem(item);
    });
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
});
