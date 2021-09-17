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
        this.datas = []
        this.book = book

    }
    addBook(bookName, auther, price){
        this.book.setName(bookName)
        this.book.setAuther(auther)
        this.book.setPrice(price)
        this.book.setComplete(false)
        
        
        this.datas= [{
            book:     this.book.getName(),
            auther:   this.book.getAuther(),
            price:    this.book.getPrice(),
            complete: this.book.getComplete()   
        }, ...this.datas]
        
        
    }
    deleteBook(index){
        this.datas.splice(index,1)

    }

    updateBook(bookName, auther, price, index){
        this.book.setName(bookName)
        this.book.setAuther(auther)
        this.book.setPrice(price)
        this.book.setComplete(false)

        this.datas[index].book = this.book.getName()
        this.datas[index].auther = this.book.getAuther()
        this.datas[index].price = this.book.getPrice()
        this.datas[index].complete = this.book.getComplete()
    }
    
    toggleBook(index){
        if(this.datas[index].complete == false){
            this.book.setComplete(true)
            this.datas[index].complete = this.book.getComplete()
        }
        else{
            this.book.setComplete(false)
            this.datas[index].complete = this.book.getComplete()
        }

    }   

}
class BookController{
    constructor(bookData){
        this.bookData = bookData
    }

    addBook(bookName, auther, price){
        this.bookData.addBook(bookName, auther, price)
    }

    deleteBook(index){
        this.bookData.deleteBook(index)
    }

    updateBookData(bookName, auther, price, index){
        this.bookData.updateBook(bookName, auther, price, index)
    }

    returnBookData(){
        return this.bookData.datas
    }

    toggleBookData(index){
        this.bookData.toggleBook(index)
    }
}

//View 
const book = new BookController(new BookData(new Book))

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
    book.deleteBook(index)
    
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
    book.returnBookData().map( (data, index) => {
        template += `
            <li id="lists">
                Book Name                : ${data.book} <br>
                Book Auther              : ${data.auther}<br>
                Book Price               : ${data.price} TL<br>
                Is that book read ?      : ${data.complete == false ? "It is not read" : "It has been read" } <br> <br>


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
