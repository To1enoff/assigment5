class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.checkedOut = false;
    }

    toggleAvailability() {
      this.checkedOut = !this.checkedOut;
    }

    displayDetails() {
      return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
  }

  class Library {
    constructor() {
      this.books = [];
    }

    addBook(book) {
      this.books.push(book);
    }

    removeBook(isbn) {
      this.books = this.books.filter((book) => book.isbn !== isbn);
    }

    searchBooks(query) {
      return this.books.filter((book) =>
        book.title.includes(query) ||
        book.author.includes(query) ||
        book.isbn.includes(query)
      );
    }
  }

  const library = new Library();
  const addBookForm = document.getElementById('addBookForm');
  const bookList = document.getElementById('bookList');

  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const newBook = new Book(title, author, isbn);
    library.addBook(newBook);
    displayBooks();
    addBookForm.reset();
  });

  function displayBooks() {
    bookList.innerHTML = '';
    library.books.forEach((book) => {
      const listItem = document.createElement('li');
      listItem.classList.add('book', book.checkedOut ? 'checked-out' : 'available');
      listItem.innerHTML = `<span>${book.displayDetails()}</span>`;
      const toggleButton = document.createElement('button');
      toggleButton.textContent = book.checkedOut ? 'Check In' : 'Check Out';
      toggleButton.addEventListener('click', () => {
        book.toggleAvailability();
        displayBooks();
      });
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        library.removeBook(book.isbn);
        displayBooks();
      });
      listItem.appendChild(toggleButton);
      listItem.appendChild(removeButton);
      bookList.appendChild(listItem);
    });
  }

  displayBooks(); 