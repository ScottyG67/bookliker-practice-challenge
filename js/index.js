const BASE_URL = "http://localhost:3000/books/"
const user1 = {"id":1,"username":"pouros"}

document.addEventListener("DOMContentLoaded", function() {
fetch(BASE_URL).then(res => res.json()).then(books => books.forEach(renderBookList))

});

const renderBookList = (book) =>{
    const list = document.querySelector("#list")
    
    const bookLi = document.createElement('li')
        bookLi.innerText = book.title
        bookLi.addEventListener("click",() => {
            showBook(book)})
    
    list.appendChild(bookLi)
}

const showBook = (book) => {
    
    const showPanel = document.getElementById("show-panel")
    showPanel.innerHTML =""
    const bookImg = document.createElement('img')
    bookImg.src = book.img_url
    const bookTitle = document.createElement('h3')
        bookTitle.innerText = book.title
    const bookSubtitle = document.createElement('h5')
        bookSubtitle.innerText = book.subtitle
    const bookAuthor = document.createElement('h5')
        bookAuthor.innerText = book.author
    const bookDescription = document.createElement('p')
        bookDescription.innerText = book.description

    const likeList = document.createElement('ul')
    console.log(likeList)
    renderLikeList(book,likeList)

    const likeBtn = document.createElement('button')
        likeBtn.innerText = likeButtonText(book)
        likeBtn.dataset.bookId = book.id
        likeBtn.addEventListener('click',()=>{
            likeBook(book)
        })


    showPanel.append(bookImg,bookTitle,bookSubtitle,bookAuthor,bookDescription,likeList,likeBtn)

}


function renderLikeList(book, likeList) {
    for(let i=0; i< book.users.length;i++){

        const userName = book.users[i].username
        const userNameCap = userName.charAt(0).toUpperCase() + userName.slice(1)
        const userLi = document.createElement('li')
        userLi.innerText= userNameCap
        likeList.appendChild(userLi)
    }   
    return likeList
}

function likeBook(book) {
    let newUsersList = book.users
    console.log (newUsersList)
    if(book.users.some(user => user.id === 1)){
        newUsersList = newUsersList.filter(user => user.id !==1)
    } else{newUsersList.push(user1)}
    
    console.log(newUsersList)
    
    let updateBook = {
        "users": newUsersList
    }
    
    let reqObj= {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(updateBook)
    }

    fetch(BASE_URL+book.id,reqObj).then(res => res.json()).then(updatedBook => showBook(updatedBook))

}

function likeButtonText(book) {
    if(book.users.some(user => user.id === 1)){
        return "Remove From Liked Books"
    } else{return "Like Book"}
}
