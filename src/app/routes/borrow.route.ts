import express from "express";
import { createBorrowBook, getBorrowedBooks } from "../controllers/borrow.controller";

const router = express.Router();


router.post("/", createBorrowBook);
router.get("/", getBorrowedBooks);

export default router;