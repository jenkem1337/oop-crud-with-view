class Book{
    constructor(name, auther, price, isComplete){
        this.name =name
        this.auther = auther
        this.price = price
        this.isComplete = isComplete
        
    }
    getName(){
        return this.name
    }
    setName(name){
        this.name = name
    }
    getAuther(){
        return this.auther
    }
    setAuther(auther){
        this.auther = auther
    }
    getPrice(){
        return this.price
    }
    setPrice(price){
        this.price = price
    }
    getComplete(){
        return this.isComplete
    }
    setComplete(boolean){
        this.isComplete = boolean
    }
}

class BookData{
    constructor(book){
        this.data = []
        this.book = book
    }
    addBook(bookName, auther, price){
        this.book.setName(bookName)
        this.book.setAuther(auther)
        this.book.setPrice(price)
        this.book.setComplete(false)
                
        this.data.push({
            name:     this.book.getName(),
            auther:   this.book.getAuther(),
            price:    this.book.getPrice(),
            complete: this.book.getComplete()   
        })
        localStorage.setItem('book', JSON.stringify(this.data))
    }
    
    deleteBookData(index){
        this.data.splice(index,1)
        localStorage.setItem('book', JSON.stringify(this.data))
    }

    updateBookData(bookName, auther, price, index){
        this.book.setName(bookName)
        this.book.setAuther(auther)
        this.book.setPrice(price)
        this.book.setComplete(false)

        this.data[index].name = this.book.getName()
        this.data[index].auther = this.book.getAuther()
        this.data[index].price = this.book.getPrice()
        this.data[index].complete = this.book.getComplete()
        localStorage.setItem('book', JSON.stringify(this.data))
    }
    
    toggleBookData(index){
        if(this.data[index].complete == false){
            this.book.setComplete(true)
            this.data[index].complete = this.book.getComplete()
            localStorage.setItem('book', JSON.stringify(this.data))
        }
        else{
            this.book.setComplete(false)
            this.data[index].complete = this.book.getComplete()
            localStorage.setItem('book', JSON.stringify(this.data))

        }
    }

    findAll(){
        if(localStorage.getItem('book') === null){
            this.data = []
        }else{
            this.data = JSON.parse(localStorage.getItem('book'))
        }
        return this.data
    }

}
class BookService{
    constructor(bookData){
        this.bookData = bookData
    }

    addBook(bookName, auther, price){
        this.bookData.addBook(bookName, auther, price)
    }

    deleteBookData(index){
        this.bookData.deleteBookData(index)
    }

    updateBookData(bookName, auther, price, index){
        this.bookData.updateBookData(bookName, auther, price, index)
    }

    toggleBookData(index){
        this.bookData.toggleBookData(index)
    }

    findAll(){
        return this.bookData.findAll()
    }
}

//View 
let book = new BookService(new BookData(new Book()))
const AddBtn = document.querySelector('.add-btn')

const addBook = (event) => {
    event.preventDefault()
    const isimInput = document.getElementById("kitap-input")
    const yazarInput = document.getElementById("yazar-input")
    const fiyatInput = document.getElementById("fiyat-input")    
    const messageContainer = document.getElementById("msg-container")

    if(isimInput.value !="" && yazarInput.value !="" && fiyatInput.value!=""){

        book.addBook(isimInput.value, yazarInput.value ,fiyatInput.value)
        
        messageContainer.style.display = "block"
        messageContainer.style.backgroundColor = "green"
        messageContainer.innerHTML = "You have been added a book a few second ago :)"
        let messageTimeout = setTimeout(() => messageContainer.style.display = "none" ,5000)

        isimInput.value = ""
        yazarInput.value = ""
        fiyatInput.value = "" 
        Render()
    }else{
        
        messageContainer.style.display = "block"
        messageContainer.style.backgroundColor = "red"
        messageContainer.innerHTML = "Please fill blank input fields !"
        let messageTimeout = setTimeout(() => messageContainer.style.display = "none" ,5000)
        
        isimInput.value = ""
        yazarInput.value = ""
        fiyatInput.value = ""
    }
}

const Delete = (event,index) =>{
    event.preventDefault()
    book.deleteBookData(index)
    
    const messageContainer = document.getElementById("msg-container")
    messageContainer.style.display = "block"
    messageContainer.style.backgroundColor = "red"
    messageContainer.innerHTML = "You deleted a book a few second ago."
    let messageTimeout = setTimeout(() => messageContainer.style.display = "none" ,5000)
    
    Render()
}


const itsFinished = (event, index) => {
    event.preventDefault()
    book.toggleBookData(index)
    
    const messageContainer = document.getElementById("msg-container")
    messageContainer.style.display = "block"
    messageContainer.style.backgroundColor = "lightsalmon"
    messageContainer.innerHTML = "You toggled a book a few second ago."
    let messageTimeout = setTimeout(() => messageContainer.style.display = "none" ,5000)
    
    Render()
}

const UpdateBook = (event,index) => {
    event.preventDefault()

    const newBookName = document.querySelector(".newbook")
    const newBookAuther = document.querySelector(".newauther")
    const newBookPrice = document.querySelector(".newprice")

    if(newBookName.value !="" && newBookAuther.value !="" && newBookPrice.value !=""){
        book.updateBookData(newBookName.value, newBookAuther.value, newBookPrice.value ,index)
        
        const messageContainer = document.getElementById("msg-container")
        messageContainer.style.display = "block"
        messageContainer.style.backgroundColor = "lightskyblue"
        messageContainer.innerHTML = "You toggled a book a few second ago."
        let messageTimeout = setTimeout(() => messageContainer.style.display = "none" ,5000)
        
        Render()

        newBookName.value = ""
        newBookAuther.value= ""
        newBookPrice.value= ""
    }
}



const openUpdateForm = (event) => {
    event.preventDefault()
    const updateBox = document.getElementById("update")
    const updateInput = document.getElementById("form-btn")
    if(updateBox.style.display == "none"){
        updateBox.style.display = "block"
        updateInput.innerHTML = "Close Update Form"
    }else{
        updateBox.style.display = "none"
        updateInput.innerHTML = "Open Update Form"
    }
    Render()   
}


const Render = () => {
    let template = ""
    const ulTag = document.getElementById("list")
    let books = book.findAll()
    books.forEach((data, index) => {
        template += `
            <li id="lists">
                Book Name                : ${data.name} <br>
                Book Auther              : ${data.auther}<br>
                Book Price               : ${data.price} TL<br>
                Is this book read ?      : ${data.complete == false ? "It did not read" : "It has been read" } <br> <br>


                <div >
                    <button class="book-buttons delete-btn" onclick="Delete(event,${index})">Delete</button>
                    <button class="book-buttons toggle-btn" onclick="itsFinished(event, ${index})">Toggle</button>
                    <button class="book-buttons update-btn"onclick="UpdateBook(event, ${index})">Update Book</button>
                </div>                        
            </li>        
        `
    })
    ulTag.innerHTML = template
}
Render()
