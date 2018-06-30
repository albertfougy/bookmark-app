'use strict';

/* global store api */

const bookmarkList = (function(){

  // generate the the item elements
  function generateItemElement (item) {
    // IF expanded true then  everything will be shown.
    // ElSE this grouping
    // expand button
    return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${item.title}    &nbsp;&nbsp;rating: ${item.rating}
      <div class="bookmark-item-controls">
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
          </button>
          <button class="bookmark-item-expand js-item-expand">
            <span class ="button-label">expand</span>
          </button>

      </div>
    </li>`;
  }

  function generateExpandedView(item){
    return `
      <li aria-label="click to expand bookmark" class="expand-bookmark-view js-expand-bookmark-view" data-item-id="${item.id}">
        <h2>${item.title}</h2>
        <form id="js-close-expanded" class="header-right js-header-right">
        <p class="expanded-stars js-expanded-stars">rating: ${item.rating} </p>
          <button class="close-button js-close-button" type="submit" aria-label="click to close ${item.title} expanded view">Close</button>
        </form>
        <p class="long-desc js-long-desc">${item.desc}</p>
        <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">${item.url}</a>
        <div>
            <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">
            <button class="visit-site-button js-visit-site-button" aria-label="click to visit ${item.title} website">VISIT</button></a>
        </div>
        <form id="js-delete-bookmark">
          <button class="delete-bookmark-button js-delete-bookmark-button" type="submit" aria-label="click to delete ${item.title} website">DELETE</button>
        </form>
      </li>`;

  }








  // SECTION FOR FORM ELEMENT
  // function generate expanded view
  // RADIO BUTTONS INSTEAD OF STARS?
  // SORT RATING BY NUMBERS INSTEAD OF STARS
  // const generateCreateBookmarkView = function (item) {
  //   return `
  //   <li class="js-create-bookmark-view" aria-live="polite">
  //     <h2>Create Bookmark</h2>
  //       <form id="js-add-bookmark">
  //         <label for="add-bookmark-title"></label>
  //         <input class=" js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title" required aria-label="enter bookmark">
  //         <label for="add-bookmark-link"></label>
  //         <input class="js-add-bookmark-link" id="add-bookmark-link" name="url" type="url" aria-label="enter a url "value="http://" placeholder="http://www.cnn.com" required>
  //         <p>
  //            <textarea cols="50" rows="5" type="text" name="bookmark-desc" class="js-bookmark-list-entry js-add-bookmark-desc" placeholder="description"></textarea>
  //         </p>
  //         <div id="js-add-star-rating">
  //           <div class="js-rate-radio-buttons" aria-label="please select rating for new bookmark">
  //             <fieldset>
  //               <Legend required>STARS</Legend>
  //               <label aria-label="select rating 5 star"for="5-stars">5</label>
  //               <input type="radio" id="5-stars"
  //                 name="rate" value="5" required>
  //               <label aria-label="select rating 4 star"for="4-stars">4</label>
  //               <input type="radio" id="4-stars"
  //                 name="rate" value="4">
  //               <label aria-label="select rating 3 star"for="3-stars">3</label>
  //               <input type="radio" id="3-stars"
  //                 name="rate" value="3">
  //               <label aria-label="select rating 2 star"for="2-stars">2</label>
  //               <input type="radio" id="2-stars"
  //                 name="rate" value="2">
  //               <label aria-label="select rating 1 star" for="1-stars">1
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
  // };

  //   const generateBookmarkHTML = function (item) {
  //     if(item.rating)
  //       return `
  // <div class="col-12" aria-live="assertive" aria-label="add a bookmark" >
  //   <!-- calling bookmark-list to replace for the DOM -->
  //   <ul class="js-bookmark-list js-item-delete">
  //   </ul>
  // </div>`;
  // }



  // function to show the bookmark view

  // Function to create the bookmark after click

  // Function to handle the closed bookmark after expanded view


  // FUNCTION FOR EXPANDING THE FORM



  // FUNCTION TO FILTER BOOKMARKS BY RATING

  // FUNCTION FOR EDITING DESCRIPTION AND RATING





  // re-write bookmark string
  // if store. add is equal to true generate the bookmark view.
  // if(store.add) {
  //   const bookmarkForm = generateCreateBookmarkView();
  //   $('.js-bookmark-list').prepend(bookmarkForm);
  // }


  // function handleFilterByRatingClicked() {
  //   $('.js-star-rating').on('change', function(event) {
  //     event.preventDefault();
  //     const val = $(event.currentTarget).val();
  //     store.filterByRating(val);
  //     render();
  //   });
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
        store.addItem(response);
        console.log('Bookmark created successfully', response);
        render();
      });
    });
  };


  // js-item-element
  const handleExpandedView = function (){
    $('.js-bookmark-list').on('click', '.js-item-expand', event => {
      const id = getItemIdFromElement(event.currentTarget);
      let item = store.findById(id);
      $(event.currentTarget).remove();
      if(item.id === id){
        const expandView = generateExpandedView(item);
        $('.js-item-element').hide();
        $('.js-bookmark-list').prepend(expandView);
        store.expanded = true;
        // $('js-item-element').hide();

        //render();
      }
    });
  };



  // FUNCTION TO RENDER THE BOOKMARK LIST.
  // MAKES SENSE TO PUT IT AT THE TOP.
  // HAVE TO RE-FACTOR . REMOVE API.GET-ITEMS. THE ONLY THING TO USE IS
  // THE BOOKMARK LIST STRING.

  function render() {


    api.getItems(items => {
      let  bookmarkListItemsString =''  ;
      items.forEach(item => {
        bookmarkListItemsString += generateItemElement(item); // IMPORTANT LINE TO KEEP
      });

      // insert element into the DOM
      $('.js-bookmark-list').html(bookmarkListItemsString); // IMPORTANT LINE TO KEEP
      // ('#js-add-bookmark').show();
      // ('#js-add-bookmark').hide();
    });
  }





  // INPUT VALIDATION. MOVED FROM Item.js
  // const Item = (function(){

  //   const validateName = function(name) {
  //     if (!name) throw new TypeError('Name must not be blank');
  //   };

  //   const create = function(name) {
  //     return {
  //       id: cuid(),
  //       name,
  //       checked: false
  //     };
  //   };

  //   return {
  //     validateName,
  //     create,
  //   };

  // }());


  const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };

  // event.currentTarget.parentElement.parentElement
  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark-button', event => {
      //const id = getItemIdFromElement(event.currentTarget.parentElement.parentElement);
      const id = $(event.currentTarget.parentElement.parentElement).data('item-id');
      event.preventDefault();
      api.deleteItem(id, () => {
        console.log(id);
        // store.findAndDelete(id);
        render();
      });

    });
  }

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
    handleExpandedView();
    handleDeleteBookmarkClicked();
  //  handleFilterByRatingClicked();

  };



  return {
    bindEventListeners,
    render,
  };
}());
