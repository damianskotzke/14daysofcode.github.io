const editor = document.getElementById('editor');
const menu = document.getElementById('context-menu');
const url = document.getElementById('url');
const heading = document.getElementById('heading');
const bold = document.getElementById('bold');
const italic = document.getElementById('italic');
const link = document.getElementById('link');

let selection = window.getSelection();
let savedRange;
let selectedElement;

function clearSelection() {window.getSelection().removeAllRanges();};
function hideMenu() {menu.style.display = 'none';};


// Menu
editor.addEventListener('mouseup', function() {
    let selectedText = selection.toString();
    let range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer.parentNode;

    // Menu display & position
    if (selectedText.length > 0) {
        let range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect();
        menu.style.left = rect.left + 'px';
        menu.style.top = rect.top - rect.height + 'px';
        menu.style.display = 'block';
    } else {
        hideMenu();
    };
    
    // URL input
    // Save the current selected reange whenever mouse is up in the editor
    if (parentNode.nodeName.toLowerCase() === 'a') {
        url.style.display = 'inline-block';
        savedRange = selection.getRangeAt(0);
        selectedElement = parentNode;
        url.value = parentNode.getAttribute('href');
    } else {
        url.style.display = 'none';
        url.value = '';
    };
});

// Hide the menu when clicked outside the editor
document.addEventListener('click', function(event) {
    if (!editor.contains(event.target)) {
        menu.style.display = 'none';
    };
});
url.addEventListener('click', function(event) {
    event.stopPropagation();
});

// Attach href to the 'a' tag
url.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if (savedRange != null) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
            //document.execCommand('createLink', false, url.value);

            let range = selection.getRangeAt(0);
            let parentNode = range.commonAncestorContainer.parentNode;

            if (parentNode.nodeName.toLowerCase() === 'a') {
                parentNode.setAttribute('href', url.value);
            };

            url.value = '';
            clearSelection();
            hideMenu();
        }
    }
});

// Heading
heading.addEventListener('click', function() {
    if (!selection.rangeCount) return;
    let range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.nodeName.toLowerCase() != 'h1') {
        let selectedText = range.extractContents();
        let newElement = document.createElement('h1');
        newElement.appendChild(selectedText);
        range.insertNode(newElement);
        clearSelection();
        hideMenu();
    } else {
        let docFrag = document.createDocumentFragment();
        while (parentNode.firstChild) {
            docFrag.appendChild(parentNode.firstChild);
        }
        parentNode.parentNode.replaceChild(docFrag, parentNode);
        clearSelection();
        hideMenu();
    }
});

// Bold
bold.addEventListener('click', function() {
    if (!selection.rangeCount) return;
    let range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.nodeName.toLowerCase() != 'b') {
        let selectedText = range.extractContents();
        let newElement = document.createElement('b');
        newElement.appendChild(selectedText);
        range.insertNode(newElement);
        clearSelection();
        hideMenu();
    } else {
        let docFrag = document.createDocumentFragment();
        while (parentNode.firstChild) {
            docFrag.appendChild(parentNode.firstChild);
        }
        parentNode.parentNode.replaceChild(docFrag, parentNode);
        clearSelection();
        hideMenu();
    }
});

// Italic
italic.addEventListener('click', function() {
    if (!selection.rangeCount) return;
    let range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.nodeName.toLowerCase() != 'i') {
        let selectedText = range.extractContents();
        let newElement = document.createElement('i');
        newElement.appendChild(selectedText);
        range.insertNode(newElement);
        clearSelection();
        hideMenu();
    } else {
        let docFrag = document.createDocumentFragment();
        while (parentNode.firstChild) {
            docFrag.appendChild(parentNode.firstChild);
        }
        parentNode.parentNode.replaceChild(docFrag, parentNode);
        clearSelection();
        hideMenu();
    }
});

// Link
link.addEventListener('click', function() {
    if (!selection.rangeCount) return;
    let range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.nodeName.toLowerCase() != 'a') {
        let selectedText = range.extractContents();
        let newElement = document.createElement('a');
        newElement.appendChild(selectedText);
        newElement.setAttribute('class', 'link');
        range.insertNode(newElement);
        clearSelection();
        hideMenu();
        
    } else {
        let docFrag = document.createDocumentFragment();
        while (parentNode.firstChild) {
            docFrag.appendChild(parentNode.firstChild);
        }
        parentNode.parentNode.replaceChild(docFrag, parentNode);
        clearSelection();
        hideMenu();
    }
});

