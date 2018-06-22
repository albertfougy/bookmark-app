'use strict';
/* global  api, bookmark. bookmark-list, Item */


bookmarkList.handleDeleteItemClicked();
bookmarkList.render();


$("#bookmark-add-btn").on("click", event => {
  const title = $('#js-add-bookmark input[name="bookmark-title"]')[0].value;
  const url = $('#js-add-bookmark input[name="bookmark-url"]')[0].value;
  const desc = $('#js-add-bookmark textarea[name="bookmark-desc"]')[0].value;
  const rating = parseInt($('#bookmark-rating')[0].value);


  // ToDo Validation
  // title ( use simple string methods to validate)
  // url(must start with http(s): Use Regex

  api.createItem({title, url, desc, rating}, response => {
    console.log('Bookmark created successfully', response)

    bookmarkList.render();
  })
});
