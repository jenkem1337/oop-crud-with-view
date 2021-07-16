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
        
        
        this.datas.push({
            book:     this.book.getName(),
            auther:   this.book.getAuther(),
            price:    this.book.getPrice(),
            complete: this.book.getComplete()   
        })

    }
    deleteBook(index){
        this.datas.splice(index,1)
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

    returnBookData(){
        return this.bookData.datas
    }
    toggleBookData(index){
        this.bookData.toggleBook(index)
    }


}

//View 
const book = new BookController(new BookData(new Book))


const isimInput = document.getElementById("kitap-input")
const yazarInput = document.getElementById("yazar-input")
const fiyatInput = document.getElementById("fiyat-input")
const ulTag = document.getElementById("list")


const addBook = () => {
    if(isimInput.value !="" && yazarInput.value !="" && fiyatInput.value!=""){

        book.addBook(isimInput.value, yazarInput.value ,fiyatInput.value)

        Render()

        isimInput.value = ""
        yazarInput.value = ""
        fiyatInput.value = "" 
    }else{
        isimInput.value = ""
        yazarInput.value = ""
        fiyatInput.value = "" 
        return console.log(false)
    }
}

const Delete = (event,index) =>{
    event.preventDefault()
    book.deleteBook(index)
    Render()
}


const itsFinished = (event, index) => {
    event.preventDefault()
    book.toggleBookData(index)
    Render()
}


const Render = () => {
    let template = ""
    book.returnBookData().map((data, index) =>{
        template += `
            <li id="lists">
                Kitabın İsmi           : ${data.book} <br>
                Kitabın Yazarı         : ${data.auther}<br>
                Kitabın Fiyatı         : ${data.price} TL<br>
                Kitap Okundu Mu ?      : ${data.complete == false ? "Okunmadı" : "Okundu" }
             </li>

             <div class="buttons">
                <button class="sil-btn" onclick="Delete(event,${index})">Sil</button>
                <button class="güncelle-btn" onclick="itsFinished(event, ${index})">Okundu Olarak İşaretle</button>
            </div>
        `
    })
    ulTag.innerHTML = template
}