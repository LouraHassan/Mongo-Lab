import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Book from "./Models/book.js";

const app = express();
app.use(express.json())
const port = 3340
dotenv.config();
main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(process.env.DB_URL);
  console.log("database connected");
}
  

app.get('/addBook', (req, res) => {
    Book.find().then(result => {
        res.send(result)
    })
})

app.post('/addBook',(req, res) => {
    const book = new Book({
        bookName: req.body.bookName,
        author: req.body.author,
        PrintNum: req.body.PrintNum,
        publishDate: req.body.publishDate,
        eCopy: req.body.eCopy,
        price: req.body.price,
        supportedLanguages: req.body.supportedLanguages,
        category: req.body.category
    })

    book.save().then(result => {
        res.send(result)
    })
})
app.patch('/addBook/:id', (req, res) => {
    const { id } = req.params
    Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).then(result => {
        res.send(result)
    })
})

app.delete('/addBook/:id', async (req, res) => {
    const { id } = req.params
    const book = await Book.findByIdAndDelete(id)
    if (!book) {
        return res.status(400).send("Book not found")
    }
    return res.send(book)
})

app.get('/addBook/:id', (req, res) => {
    const { id } = req.params
    Book.findById(id).then(result => {
        res.send(result)
    })
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
)