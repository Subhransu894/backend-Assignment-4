const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    author:{
        type:String,
    },
    publishedYear:{
        type:Number,
    },
    genre:[{
        type:String,
        enum:['Fiction','Historical','Romance','Fantasy','Mystery','Thriller','Non-Fiction','Self-help'],
    }],
    language:{
        type:String,
    },
    country:{
        type:String,
    },
    rating:{
        type: Number,
        min:0,
        max:10,
    },
    summary:{
        type:String,
    },
    coverImageUrl:{
        type:String,
    },
});

const Book = mongoose.model("Book",bookSchema)
module.exports=Book;