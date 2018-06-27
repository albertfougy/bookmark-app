'use strict';

/* global store api */

const bookmarkList = (function(){

  // generate the the item elements
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




  // function generate expanded view


  // function to show the bookmark view

  // Function to create the bookmark after click

  // Function to handle the closed bookmark after expanded view

  // Function to add bookmark after add button. Take function from index.js



  $('#bookmark-add-btn').on('click', event => {
    const title = $('#js-add-bookmark input[name="bookmark-title"]')[0].value;
    const url = $('#js-add-bookmark input[name="bookmark-url"]')[0].value;
    const desc = $('#js-add-bookmark textarea[name="bookmark-desc"]')[0].value;
    const rating = parseInt($('#bookmark-rating')[0].value);


    // ToDo Validation
    // title ( use simple string methods to validate)
    // url(must start with http(s): Use Regex

    api.createItem({title, url, desc, rating}, response => {
      console.log('Bookmark created successfully', response);
      bookmarkList.render();
    });
  });


  // Function to expand the view

  // Function to filter by rating

// re-write bookmark string

  function render() {
    api.getItems(items => {
      let  bookmarkListItemsString =''  ;
      items.forEach(item => {

        //
        bookmarkListItemsString += generateItemElement(item);
      });

      // insert element into the DOM
      $('.js-bookmark-list').html(bookmarkListItemsString);
    });
  }


  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  // Delete item from list


  const handleDeleteItemClicked = function () {
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

  handleDeleteItemClicked();


  const bindEventListeners = function (){
    handleDeleteItemClicked();
    addBookmarkAfterClicked();
  };



  return {
    bindEventListeners,
    render,

  };
}());
