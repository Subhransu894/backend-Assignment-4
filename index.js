const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const {initializeDatabase} = require("./db/db.connect");
const Book = require("./models/books.models");

app.use(cors(corsOptions));

app.use(express.json())

initializeDatabase();
//qs-1 & qs-2
async function createBooks(newBooks){
    try{
        const book = new Book(newBooks);
        const saveBook = await book.save();
        return saveBook;
    }catch(error){
        console.log(error);
    }
}
app.post("/books",async(req,res)=>{
    try {
        const savedBook = await createBooks(req.body);
        res.status(201).json({message:"book added successfully",savedBook:savedBook});
    } catch (error) {
        res.status(500).json({error:"Failed to add Books"})
    }
})
//qs-3 read all the book from db
async function readAllBook(){
    try {
        const book = await Book.find()
        return book;
    } catch (error) {
        console.log(error);
    }
}
app.get("/books",async(req,res)=>{
    try {
        const book = await readAllBook();
        if(book.length != 0){
            res.json(book);
        }else{
            res.status(404).json({error:"no book found"})
        }
    } catch (error) {
        res.status(500).json({error:"Faild to fetch the book"})
    }
})

//qs-4. Create an API to get a book's detail by its title
async function readByTitle(bookTitle){
    try {
        const book = await Book.find({title: bookTitle});
        return book;        
    } catch (error) {
        throw error
    }
}
app.get("/books/:Btitle",async(req,res)=>{
    try {
        const book = await readByTitle(req.params.Btitle);
        if(book){
            res.json(book);
        }else{
            res.status(404).json({error:"no book found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})
    }
})
//qs-5. Create an API to get details of all the books by an author
async function readByAuthor(bookAuthor) {
    try {
        const book = await Book.find({author:bookAuthor});
        return book;
    } catch (error) {
        throw error;
    }
}
app.get("/books/author/:authorName",async(req,res)=>{
    try {
        const book = await readByAuthor(req.params.authorName);
        if(book){
            res.json(book);
        }else{
            res.status(404).json({error:"no book found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})
    }
})

//qs-6-Create an API to get all the books which are of "Business" genre.
async function readByGenre(bookGenre){
    try {
        const bookByGenre = await Book.find({genre: bookGenre})
        return bookByGenre;
    } catch (error) {
        throw error;
    }
}
app.get("/books/genre/:booksGenre",async(req,res)=>{
    try {
        const book = await readByGenre(req.params.booksGenre)
        if(book.length != 0){
            res.json(book)
        }else{
            res.status(404).json({error:"no book found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})
    }
})

//qs-7
async function readByYear(bookYear){
    try {
        const bookByYear = await Book.find({publishedYear: bookYear});
        return bookByYear;
    } catch (error) {
        throw error;
    }
}
app.get("/books/year/:bookByYear",async(req,res)=>{
    try {
        const book = await readByYear(req.params.bookByYear);
        if(book){
            res.json(book)
        }else{
            res.status(404).json({error:"no book found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})
    }
})

//qs-8. Create an API to update a book's rating with the help of its id.
//  Update the rating of the "Lean In" from 4.1 to 4.5.
//  Send an error message "Book does not exist", in case that book is not found
async function updateBook(bookId,dataToUpdate){
    try {
        const updBook = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new:true});
        return updBook;
    } catch (error) {
        throw error;
    }
}
app.post("/books/:booksId",async(req,res)=>{
    try {
        const updatedBook = await updateBook(req.params.booksId,req.body);
        if(updatedBook){
            res.status(200).json({message:"book updated successfully",updatedBook: updatedBook})
        }else{
            res.status(404).json({error:"Book doesn't exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})   
    }
})
//qs-9
async function updateLastBook(bookTitle,dataToUpdate){
    try {
        const bookByTitle = await Book.findOneAndUpdate({title:bookTitle},dataToUpdate,{new:true})
        return bookByTitle;
    } catch (error) {
        throw error;
    }
}
app.post("/books/title/:booksTitle",async(req,res)=>{
    try {
        const updatedBook = await updateLastBook(req.params.booksTitle,req.body);
        if(updatedBook){
            res.status(200).json({message:"book updated successfully",updatedBook:updatedBook});
        }else{
            res.status(404).json({error:"Book doesn't exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})  
    }
})

//qs-10
async function deleteBook(bookId){
    try {
        const deleteBk = await Book.findByIdAndDelete(bookId);
        return deleteBk;
    } catch (error) {
        throw error;
    }
}
app.delete("/books/:bookId",async(req,res)=>{
    try {
        const deletedBook = await deleteBook(req.params.bookId);
        if(deletedBook){
            res.status(200).json({message:"deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch book"})  
    }
})
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})