const myLibrary = [];

function Book(title, author, pages, isRead) {
    /* I'm not sure if I need this id */
    Book.currentId = (Book.currentId || 0) + 1;
    this.id = Book.currentId - 1;
    console.log(this.id);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    myLibrary.push(this);
}

function addBook(event) {
    event.preventDefault();
    let formTitle = document.getElementById('formTitle');
    let formAuthor = document.getElementById('formAuthor');
    let formPages = document.getElementById('formPages');
    let formIsRead = document.getElementById('formIsRead');
    console.log('Adding new book to the Library');
    let newBook = new Book(formTitle.value, formAuthor.value, 
        formPages.value, formIsRead.checked);
    composeCard(newBook);
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formIsRead.checked = false;
    
}

function composeCard(book) {
    let textIsRead = '';
    if(book.isRead) {
        textIsRead = "You've read it"
    } else {
        textIsRead = "You haven't read it"
    }
    /*DOM elements creation area.
    I'm not sure where should I put this code.
    I think that it's pretty legit to put it in this function.*/
    const cardsWrapper = document.getElementById('cardArea');
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id);
    cardsWrapper.appendChild(card);
    
    const cardTitle = document.createElement('p');
    cardTitle.textContent = `Title: ${book.title}`;
    card.appendChild(cardTitle);

    const cardAuthor = document.createElement('p');
    cardAuthor.textContent = `Author: ${book.author}`;
    card.appendChild(cardAuthor);

    
    const cardPages = document.createElement('p');
    cardPages.textContent = `Pages: ${book.pages}`;
    card.appendChild(cardPages);

    const cardIsRead = document.createElement('p');
    cardIsRead.textContent = textIsRead;
    card.appendChild(cardIsRead);

    const cardControlsDiv = document.createElement('div');
    cardControlsDiv.classList.add('card-controls');
    card.appendChild(cardControlsDiv);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    cardControlsDiv.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('btn-red');
    cardControlsDiv.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeBook(book.id);
    });
}

function removeBook(id) {
    console.log('Im running!!!')
    let bookToRemove = myLibrary.find(book => book.id === id);
    console.log(myLibrary.indexOf(bookToRemove));
    myLibrary.splice(myLibrary.indexOf(bookToRemove), 1);

    let cardToRemove = document.querySelector(`[data-id="${id}"]`);
    cardToRemove.remove();
}


const dlgBtn = document.getElementById('addBookBtn');
const addBookDialog = document.getElementById('addBookDialog');

dlgBtn.addEventListener('click', () => {
    addBookDialog.showModal();
});

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // Add your input elements with the 'required' attribute
    const formTitle = document.getElementById('formTitle');
    const formAuthor = document.getElementById('formAuthor');
    const formPages = document.getElementById('formPages');

    // Check if all required inputs are filled
    if (formTitle.checkValidity() && formAuthor.checkValidity() 
    && formPages.checkValidity()) {
        // All required inputs are filled, proceed with submission
        addBook(event);
        addBookDialog.close();
    } else {
        // Some required inputs are empty, display an error or take appropriate action
        alert('Please fill in all required fields.');
    }
});