const imageContainer = document.getElementById('image-container');
const input = document.getElementById('input');
let books;
let startindex=0;
// Unsplash API
const count = 10
// You shouldn't store API Keys publicly like this, but this is an exception because it is free and the data are anyways available.
const APIkey = "AIzaSyBWHAZ1mINjKHBxj_aKBsTModL9SiDvAnA"

// Clear html content 
function clearBooks(){
    imageContainer.innerHTML=''
}
// Search for books
function searchBooks(){
    clearBooks();
    getBooks();
}
// Get books from API
function getBooks(){
    let searchTerm = input.value;
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startindex}&${APIkey}`;
    axios.get(apiUrl)
        .then(response => { 
            books = response.data;
            displayBooks();
        })
        .catch();
}

// Create Elements For Links & books, Add to DOM
function displayBooks() {
    booksArray=books.items
    // Run function for each object in books
    booksArray.forEach((book) => {
      // Create <a> to link to book preview
      const item = document.createElement('a');
      item.setAttribute('href',book.volumeInfo.previewLink);
      item.setAttribute('target','_blank');
      // Create <img> for book
      const img = document.createElement('img');
      img.setAttribute('src',book.volumeInfo.imageLinks.thumbnail);
      // Put <img> inside <a>, then put both inside imageContainer Element
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }

  // Check to see if scrolling near bottom of page, Load More books
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        startindex += 10;
        getBooks();
    }
  });
  
