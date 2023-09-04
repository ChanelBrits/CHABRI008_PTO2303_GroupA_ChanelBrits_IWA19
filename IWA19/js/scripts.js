import { 
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

for (const book of books) {
    const authorId = book.author;
    const authorName = authors[authorId];

    const genreNames = book.genres.map(genreId => genres[genreId]);

    bookList.push({
        id: book.id,
        title: book.title,
        author: authorName,
        genres: genreNames,
        image: book.image
    });
}

const createListHtml = (bookList) => {
    const fragment = document.createDocumentFragment();

    bookList.map( book => {
        const bookContainer = document.createElement('div')

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
    })
    const bookListElement = document.querySelector('[data-list-items]');
    bookListElement.appendChild(fragment);

    const styleElements = document.querySelectorAll('[data-styling]');
    for (const element of styleElements) {
        createStyling(element);
    }
}

createListHtml(bookList);

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

const handlerSettingsSubmit = (event) => {
    event.preventDefault();

    const {
        option: settingsOption,
        overlay: settingsOverlay
    } = html.settings

    const settingsOptionValue = settingsOption.value;
    console.log(settingsOptionValue);

    changeTheme(settingsOptionValue);
    closeOverlay(settingsOverlay);
}

let clickedBookId = null;

const handlerPreviewToggle = (event) => {
    const {
        overlay: previewOverlay,
        close: previewClose
    } = html.preview

    const bookBlock = event.currentTarget;
    clickedBookId = bookBlock.dataset.id;
    console.log(clickedBookId)

    previewOverlay.style.display = 'block';

    previewClose.addEventListener('click', () => {
        closeOverlay(previewOverlay);
    })
}

const handlerPreviewDisplay = (event) => {
    const {
        blur: previewBlur,
        image: previewImage,
        title: previewTitle,
        subtitle: previewSubtitle,
        description: previewDescription,
    } = html.preview

    const clickedBookData = books.find((book) => book.id === clickedBookId);

    const publicationYear = new Date(clickedBookData.published).getFullYear();
    const authorName = authors[clickedBookData.author];
    console.log(publicationYear, authorName)

    previewBlur.src = clickedBookData.image;
    previewImage.src = clickedBookData.image;

    previewTitle.innerText = clickedBookData.title;

    previewSubtitle.innerHTML = ''
    const subtitleElement = document.createElement('h4');
    subtitleElement.innerText = `${authorName} (${publicationYear})`;
    previewSubtitle.appendChild(subtitleElement);

    previewDescription.innerText = clickedBookData.description;

    previewClose.addEventListener('click', () => {
        subtitleElement.remove();
    })

}

const bookBlocks = document.querySelectorAll('[data-id]');

for (const book of bookBlocks) {
    book.addEventListener('click', handlerPreviewToggle);
    book.addEventListener('click', handlerPreviewDisplay);
}

html.settings.button.addEventListener('click', handlerSettingsToggle);
html.settings.save.addEventListener('click', handlerSettingsSubmit);

const createPreviewHtml = () => {

}

matches = books
page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const extracted = books.slice(0, 36)

for ({ author, image, title, id }; extracted; i++) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

data-list-items.appendChild(fragment)

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name];Object.entries(authors); id++) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// document.element.style.setProperty('--color-dark', css[v].dark);
// document.element.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description