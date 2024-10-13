import express from "express";
import { signupUser, userLogin } from "../Controllers/userController.js";
import { addBook, editBook, authenticateToken, getBook, getAllBooks, deleteBook } from "../Controllers/bookController.js";
const router = express.Router();
router.post('/register', signupUser)
router.post('/login', userLogin)
router.post('/addBook', authenticateToken, addBook)
router.get('/addBook/:id', getBook)
router.patch('/addBook/:id', editBook)
router.delete('/addBook/:id', deleteBook)
router.get('/addBook', getAllBooks)

export default router;