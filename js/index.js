//document.addEventListener("DOMContentLoaded", function() {});


function main(){
    loadBooks()
    generalEventListener()
}

function generalEventListener(){
    const body = document.querySelector('body')

    body.addEventListener('click', function(event){

        if(event.target.className === 'bookTitle'){
            //console.log(event.target.id)
            loadBookContents(event);
        } else if(event.target.className === 'button'){
            // debugger
            // console.log(event.target)
            addLike(event)
        }
    })
}

function addLike(event){
    currentBookId = event.target.id

    const myUser = {"id":"1", "username":"pouros"}

    const returnObject = {
        "users": []
    }

    currentLikers = event.target.previousElementSibling.children
    //debugger

    for(var i = 0; i < currentLikers.length; i++){
        tempObj = {
            "id": currentLikers[i].id,
            "username": currentLikers[i].innerHTML
        }
        returnObject.users.push(tempObj)
    }


    // const yeah = 'yeah'
    returnObject.users.push(myUser)

    //debugger

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(returnObject) 
    }

    fetch(`http://localhost:3000/books/${currentBookId}`, configObj)
    .then(resp => resp.json())
    .then(book => {

        const div = document.querySelector('#show-panel')

        while(div.firstChild){
            div.removeChild(div.firstChild)
        }

        //create an image or thumbnail

        const thumbnail = document.createElement('img')
        thumbnail.src = `${book.img_url}`
        div.append(thumbnail)
        //book title 

        const bookTitle = document.createElement('p')
        bookTitle.innerText = `${book.title}`
        bookTitle.style.fontWeight = 'bold'
        div.append(bookTitle)
        
        //book subtitle 

        const subTitle = document.createElement('p')
        subTitle.innerText = `${book.subtitle}`
        subTitle.style.fontWeight = 'bold';
        div.append(subTitle)

        //book author

        const author = document.createElement('p')
        author.innerText = `${book.author}`
        author.style.fontWeight = 'bold';
        div.append(author)

        //book description 

        const description = document.createElement('p')
        description.innerText = `${book.description}`
        div.append(description)

        //user names of the people that liked 
        const ul = document.createElement('ul')
        ul.className = "bookLikedUsers"
        const likedUsers = book.users 

        likedUsers.forEach(function(user){
        
            const li = document.createElement ('li')
            li.innerText = `${user.username}`
            li.id = user.id
            
            ul.append(li)
        })
        div.append(ul)

        //like button

        const button = document.createElement('button')
        button.innerHTML = "LIKE"
        button.className = "button"
        button.id = book.id
        div.append(button)
    })

        // debugger
        // const user = book.username

        // const ul = document.querySelector(".bookLikedUsers")
    
        // const li = document.createElement ('li')
        // li.innerText = `${user}`
        // li.id = book.id
        // ul.append(li)
  

}


function loadBookContents(event){
    bookId = event.target.id

    fetch(`http://localhost:3000/books/${bookId}`)
    .then(resp => resp.json())
    .then(book => {
        const div = document.querySelector('#show-panel')

        while(div.firstChild){
            div.removeChild(div.firstChild)
        }

        //create an image or thumbnail

        const thumbnail = document.createElement('img')
        thumbnail.src = `${book.img_url}`
        div.append(thumbnail)
        //book title 

        const bookTitle = document.createElement('p')
        bookTitle.innerText = `${book.title}`
        bookTitle.style.fontWeight = 'bold'
        div.append(bookTitle)
        
        //book subtitle 

        const subTitle = document.createElement('p')
        subTitle.innerText = `${book.subtitle}`
        subTitle.style.fontWeight = 'bold';
        div.append(subTitle)

        //book author

        const author = document.createElement('p')
        author.innerText = `${book.author}`
        author.style.fontWeight = 'bold';
        div.append(author)

        //book description 

        const description = document.createElement('p')
        description.innerText = `${book.description}`
        div.append(description)

        //user names of the people that liked 
        const ul = document.createElement('ul')
        ul.className = "bookLikedUsers"
        const likedUsers = book.users 

        likedUsers.forEach(function(user){
        
            const li = document.createElement ('li')
            li.innerText = `${user.username}`
            li.id = user.id
            
            ul.append(li)
        })
        div.append(ul)

        //like button

        const button = document.createElement('button')
        button.innerHTML = "LIKE"
        button.className = "button"
        button.id = book.id
        div.append(button)
    })

}




function loadBooks(){

    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
        books.forEach(function(book){
            addBookToList(book)
        })
    })
}

function addBookToList(book){
    //const bookUrl = `http://localhost:3000/books/${book.id}`
     const ul = document.querySelector('#list')
     const li = document.createElement('li')
     
     li.setAttribute("class", "bookTitle")
     li.innerText = `${book.title}`
     li.id = `${book.id}`


     ul.append(li)
}













main()
