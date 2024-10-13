import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
    bookName: String,
    author: String,
    PrintNum: Number,
    publishDate: Date,
    eCopy: Boolean,
    price: Number,
    supportedLanguages: Object,
    category: String,
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
},
{ timestamps: true }
)

const Book = mongoose.model('Book', bookSchema)

export default Book