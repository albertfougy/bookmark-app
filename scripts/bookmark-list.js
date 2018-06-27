'use strict';

/* global store api */

const bookmarkList = (function(){

  // generate the the item elements
  function generateItemElement (item) {
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


  // function generate Bookmark after clicking add item

  // function generateCreateBookmarkView() {
  //   return `
  //   <li class="js-create-bookmark-view" aria-live="polite">
  //     <h2>Create Bookmark</h2>
  //       <form id="js-add-bookmark">
  //         <label for="add-bookmark-title"></label>
  //         <input class=" js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title" required aria-label="enter bookmark">
  //         <label for="add-bookmark-link"></label>
  //         <input class="js-add-bookmark-link" id="add-bookmark-link" name="url" type="url" aria-label="enter a url "value="http://" placeholder="http://www.cnn.com" required>
  //         <label for="add-bookmark-desc"></label>
  //         <input class="js-add-bookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="Add long description here" aria-label="enter a long description "align="top">
  //         <div id="js-add-star-rating">
  //           <div class="js-rate-radio-buttons" aria-label="please select rating for new bookmark">
  //             <fieldset>
  //               <Legend required>STARS</Legend>
  //               <label aria-label="select rating 5 star"for="5-stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</label>
  //               <input type="radio" id="5-stars"
  //                 name="rate" value="5" required>
  //               <label aria-label="select rating 4 star"for="4-stars">&#x2605;&#x2605;&#x2605;&#x2605;</label>
  //               <input type="radio" id="4-stars"
  //                 name="rate" value="4">
  //               <label aria-label="select rating 3 star"for="3-stars">&#x2605;&#x2605;&#x2605;</label>
  //               <input type="radio" id="3-stars"
  //                 name="rate" value="3">
  //               <label aria-label="select rating 2 star"for="2-stars">&#x2605;&#x2605;</label>
  //               <input type="radio" id="2-stars"
  //                 name="rate" value="2">
  //               <label aria-label="select rating 1 star" for="1-stars">&#x2605;
  //               <input type="radio" id="1-star"
  //                 name="rate" value="1">
  //             </fieldset>
  //           </div>
  //         </div>
  //         <div>
  //           <button class="add-button-submit js-add-button-submit" type="submit" aria-label="click to add bookmark">ADD</button>
  //         </div>
  //       </form>
  //     </li>`;
  // }

  // function to show the bookmark view

  // Function to create the bookmark after click

  // Function to handle the closed bookmark after expanded view

  // Function to add bookmark after add button. Take function from index.js

  // Function to expand the view

  // Function to filter by rating

  // re-write bookmark string
  // if store. add is equal to true generate the bookmark view.
  // if(store.add) {
  //   const bookmarkForm = generateCreateBookmarkView();
  //   $('.js-bookmark-list').prepend(bookmarkForm);
  // }



  const addBookmarkAfterClicked = function (){

    $('#bookmark-add-btn').on('click', event => {
      event.preventDefault();
      // generate HTML to a separate screen for description above ratings
      const title = $('#js-add-bookmark input[name="bookmark-title"]')[0].value;
      const url = $('#js-add-bookmark input[name="bookmark-url"]')[0].value;
      const desc = $('#js-add-bookmark textarea[name="bookmark-desc"]')[0].value;
      const rating = parseInt($('#bookmark-rating')[0].value);


      // ToDo Validation
      // title ( use simple string methods to validate)
      // url(must start with http(s): Use Regex

      api.createItem({title, url, desc, rating}, response => {
        console.log('Bookmark created successfully', response);
        render();
      });
    });
  };



  function render() {
    api.getItems(items => {
      let  bookmarkListItemsString =''  ;
      items.forEach(item => {
        bookmarkListItemsString += generateItemElement(item);
      });

      // insert element into the DOM
      $('.js-bookmark-list').html(bookmarkListItemsString);
    });
  }

  const getItemIdFromElement = function(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };

  // Delete item from list
  const handleDeleteItemClicked = function () {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in api.items
      const id = getItemIdFromElement(event.currentTarget);

      // delete the item
      api.deleteItem(id, function() {
        console.log(id);
        render();
      });
    });
  };


  const bindEventListeners = function (){
    getItemIdFromElement();
    handleDeleteItemClicked();
    addBookmarkAfterClicked();

  };



  return {
    bindEventListeners,
    render,
  };
}());
