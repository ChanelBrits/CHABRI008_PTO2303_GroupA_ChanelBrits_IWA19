import { 
    authors, 
    genres, 
    books
} from "./data.js";

export const html = {
    settings: {
        button: document.querySelector('[data-header-settings]'),
        overlay: document.querySelector('[data-settings-overlay]'),
        form: document.querySelector('[data-settings-form]'),
        option: document.querySelector('[data-settings-theme]'),
        cancel: document.querySelector('[data-settings-cancel]'),
        save: document.querySelector('.overlay__button_primary[type="submit"][form="settings"]')
    }
}

const listStyling = {
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '7rem',
        width: '25rem',
        'background-color': 'rgb(var(--color-force-dark))',
        'border-radius': '1rem',
    },
    image: {
        padding: '0.7rem',
        height: '7rem',
    },
    title: {
        'padding-left': '1rem',
        'font-size': '1rem',
        width: '20rem',
        color: 'rgb(var(--color-force-light))',
    },
    author: {
        'padding-left': '1rem',
        'font-size': '1rem',
        color: 'rgb(var(--color-force-light))',
    },
};

const clearForm = (formElement) => {
    if (formElement) {
        formElement.reset();
    }
}

export const closeOverlay = (overlayElement, formElement) => {
    overlayElement.style.display = 'none';
    clearForm(formElement);
}

const dayTheme = {
    '--color-light': '255, 255, 255',
    '--color-dark': '10, 10, 20'
}

const nightTheme = {
    '--color-force-dark': '10, 10, 20',
    '--color-force-light': '255, 255, 255'
}


const applyStyles = (element, styles) => {
    for (const [property, value] of Object.entries(styles)) {
        if (property === 'backgroundColor' || property === 'borderRadius') {
            element.style[property] = value;
        } else {
            element.style.setProperty(property, value);
        }
    }
}

const removeStyle = (element, property) => {
    element.style.removeProperty(property);
}

const removeAppliedStyle = (element, theme) => {
    for (const property of Object.keys(theme)) {
        removeStyle(element, property);
    }
}

export const changeTheme = (theme) => {
    const root = document.documentElement;
    const containerStyling = document.querySelectorAll("[data-styling='container']");
    const textElements = document.querySelectorAll("[data-styling='title'], [data-styling='author']")

    for (const container of containerStyling) {
        if (theme === 'day') {
            removeAppliedStyle(root, nightTheme);
            applyStyles(root, dayTheme);
            container.style.backgroundColor = 'rgb(var(--color-light))';
        } else if (theme === 'night') {
            removeAppliedStyle(root, dayTheme);
            applyStyles(root, nightTheme);
            container.style.backgroundColor = 'rgb(var(--color-force-dark))';
        }
    }

    for (const element of textElements) {
        if (theme === 'day') {
            element.style.color = 'rgb(var(--color-dark))';
        } else if (theme === 'night') {
            element.style.color = 'rgb(var(--color-force-light))';
        }
    }
}

export const createStyling = (element) => {
    const styleKey = element.dataset.styling;
    const selectedStyles = listStyling[styleKey];
    applyStyles(element, selectedStyles);

    if (styleKey === 'title') {
        element.style['text-overflow'] = 'ellipsis';
        element.style['white-space'] = 'nowrap';
        element.style.overflow = 'hidden';
    }
}