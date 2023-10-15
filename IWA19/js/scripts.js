import { 
    BOOKS_PER_PAGE,
    authors, 
    genres, 
    books
} from "./data.js";

import {
    html,
    closeOverlay,
    changeTheme,
    createStyling
} from "./view.js"

const bookList = []

let page = 1;

let clickedBookId = null;

// Extracts and calculates values of book data into a new array
for (const book of books) {
    const authorId = book.author;
    const authorName = authors[authorId];

    const genreNames = book.genres.map(genreId => genres[genreId]);

    bookList.push({
        id: book.id,
        title: book.title,
        author: authorName,
        genres: genreNames,
        image: book.image,
        description: book.description,
        published: book.published
    });
}

/**
 * Generates and appends HTML elements to display a list of books within the
 * current page's range defined by the start and end indices. These HTML elements
 * are styled accordingly, and the "Show more" button is updated to reflect the
 * number of remaining books.
 *
 * @param {Array} bookList - An array of book objects to display.
 */
const createListHtml = (bookList) => {
    const startIndex = (page - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const booksOnPage = bookList.slice(startIndex, endIndex);

    const fragment = document.createDocumentFragment();

    for (const book of booksOnPage) {
        const bookContainer = document.createElement('div');
        bookContainer.dataset.container = '';
        bookContainer.dataset.page = page;

        bookContainer.innerHTML = `
            <div class="list__block" data-styling="container" data-id=${book.id}>
                <div class="list__block-image">
                    <img class="list__block-img" data-styling="image"src="${book.image}" alt="Book Cover">
                </div>
                <div class="list__block-content">
                    <h2 class="list__block-title" data-styling="title">${book.title}</h2>
                    <p class="list__block-author" data-styling="author">${book.author}</p>
                </div>
            </div>
        `        
        fragment.appendChild(bookContainer);
    }
 
    const bookListElement = document.querySelector('[data-list-items]');
    bookListElement.appendChild(fragment);

    // Applies styling to new elements
    const styleElements = document.querySelectorAll('[data-styling]');
    for (const element of styleElements) {
        createStyling(element);
    }

    const showMoreButton = document.querySelector('[data-list-button]');
    const remainingBooks = bookList.length - endIndex;

    showMoreButton.innerText = `Show more (${ remainingBooks > 0 ? remainingBooks : 0 })`;
}

createListHtml(bookList);

/**
 * Handles the click event when a user selects a book. It then toggles
 * the preview overlay display. The global variable `clickedBookId` is updated
 * based on the book that was clicked.
 *
 * @param {Event} event
 */
const handlerPreviewToggle = (event) => {
    const {
        overlay: previewOverlay,
        close: previewClose
    } = html.preview

    const bookBlock = event.currentTarget;
    const currentPage = document.querySelector('[data-page]');
    
    clickedBookId = bookBlock.dataset.id;

    previewOverlay.style.display = 'block';

    previewClose.addEventListener('click', () => {
        closeOverlay(previewOverlay);
    })
}

/**
 *  A handler that fires when a book is clicked. It retrieves information about a
 *  clicked book and displays information such as the book's image, title,
 *  author, publication year, and description. It also removes the subtitle
 *  element when closed.
 */
const handlerPreviewDisplay = () => {
    const {
        blur: previewBlur,
        image: previewImage,
        title: previewTitle,
        subtitle: previewSubtitle,
        description: previewDescription,
        close: previewClose
    } = html.preview

    const clickedBookData = bookList.find((book) => book.id === clickedBookId);
    
    const publicationYear = new Date(clickedBookData.published).getFullYear();
    const authorName = clickedBookData.author;

    previewBlur.src = clickedBookData.image;
    previewImage.src = clickedBookData.image;

    previewTitle.innerText = clickedBookData.title;

    previewSubtitle.innerHTML = '';
    const subtitleElement = document.createElement('h4');
    subtitleElement.innerText = `${authorName} (${publicationYear})`;
    previewSubtitle.appendChild(subtitleElement);

    previewDescription.innerText = clickedBookData.description;

    previewClose.addEventListener('click', () => {
        subtitleElement.remove();
    });
}

/**
 * A handler that fires when the "Show more" button is clicked. It increases the
 * page number and updates the displayed book list. After updating the page, it
 * calls back to the {@link createListHtml} function to display the updated
 * page.
 *
 * @param {Event} event  - The event object that triggers the function.
 */ 
const handlerShowMore = (event) => {
    event.preventDefault();
       
    page = page + 1;
    const bookContainers = document.querySelectorAll('[data-container]');
    for (const book of bookContainers) {
        book.dataset.page = page;
    }

    createListHtml(bookList);

    const bookBlocks = document.querySelectorAll('[data-id]')

    for (const book of bookBlocks) {
        book.addEventListener('click', handlerPreviewToggle);
    }
}

/**
 * A handler that toggles the display of the settings overlay when the settings
 * button is clicked. The settings overlay allows you to choose between a day
 * and night theme. The overlay is closed when the cancel button is clicked.
 *
 * @param {Event} event - The event object that triggers the function.
 */
const handlerSettingsToggle = (event) => {
    event.preventDefault();

    const {
        button: settingsButton,
        overlay: settingsOverlay,
        cancel: settingsCancel
    } = html.settings

    settingsButton.addEventListener('click', () => {
        settingsOverlay.style.display = 'block'
    })

    settingsCancel.addEventListener('click', () => {
        closeOverlay(settingsOverlay);
    })
}

/**
 * A handler that stores and applies the selected theme. The function changes the theme
 * based on the chosen value using {@link changeTheme} and the settings overlay
 * is closed.
 *
 * @param {Event} event - The event object that triggers the function.
 */
const handlerSettingsSubmit = (event) => {
    event.preventDefault();

    const {
        option: settingsOption, 
        overlay: settingsOverlay
    } = html.settings

    const settingsOptionValue = settingsOption.value;

    changeTheme(settingsOptionValue);
    closeOverlay(settingsOverlay);
}

// Event listeners are set up for the above handlers
html.other.button.addEventListener('click', handlerShowMore);

const bookContainer = document.querySelectorAll('[data-id]');

for (const book of bookContainer) {
    book.addEventListener('click', handlerPreviewToggle);
    book.addEventListener('click', handlerPreviewDisplay);
}

html.settings.button.addEventListener('click', handlerSettingsToggle);
html.settings.save.addEventListener('click', handlerSettingsSubmit);
