import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Book from "../Models/book.js";
import User from "../Models/userSchema.js";
export function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  }
export const addBook = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        const book = new Book({
        bookName: req.body.bookName,
        author: user._id,
        PrintNum: req.body.PrintNum,
        publishDate: req.body.publishDate,
        eCopy: req.body.eCopy,
        price: req.body.price,
        supportedLanguages: req.body.supportedLanguages,
        category: req.body.category,
      });
        
        await book.save()
        user.books.push(book._id);
        await user.save()
        res.status(201).json({message: 'Book added', book: book})
    } catch (error) {
        res.status(500).json({message: 'error creating book', error})
  }
}

export const editBook = (req, res) => {
    const { id } = req.params;
    Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).then(
      (result) => {
        res.send(result);
      }
    );
}

export const getBook = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('books');
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: 'error retrieving user', error})
    }
}
export const getAllBooks = (req, res) => {
    Book.find().then((result) => {
        res.send(result);
      });
}
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(400).send("Book not found");
    }
    return res.send(book);
}