const imageContainer = document.getElementById('image-container');
const input = document.getElementById('input');
let books;
let startindex=0;
const count = 10
const APIkey = "AIzaSyBWHAZ1mINjKHBxj_aKBsTModL9SiDvAnA"

input.addEventListener('keyup',function(event){
   if(event.key == "Enter" && input.value !=''){
        searchBooks();
    }
})

function clearBooks(){
    imageContainer.innerHTML=''
}

function searchBooks(){
    clearBooks();
    getBooks();
}

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

function displayBooks() {
    booksArray=books.items
    booksArray.forEach((book) => {
      const item = document.createElement('a');
      item.setAttribute('href',book.volumeInfo.previewLink);
      item.setAttribute('target','_blank');

      const img = document.createElement('img');
      img.setAttribute('src',book.volumeInfo.imageLinks.thumbnail);
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }

  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        startindex += 10;
        getBooks();
    }
  });
  
