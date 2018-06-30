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
        $('js-item-element').hide();
      }
    });
  };



  function render() {


    api.getItems(items => {
      let  bookmarkListItemsString =''  ;
      items.forEach(item => {
        bookmarkListItemsString += generateItemElement(item); // IMPORTANT LINE TO KEEP
      });

      // insert element into the DOM
      $('.js-bookmark-list').html(bookmarkListItemsString); // IMPORTANT LINE TO KEEP
    });
  }




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

  };



  return {
    bindEventListeners,
    render,
  };
}());
