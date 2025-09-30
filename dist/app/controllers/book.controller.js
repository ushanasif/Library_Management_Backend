"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_module_1 = __importDefault(require("../modules/book.module"));
// 1. Create Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_module_1.default.create(req.body);
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create book', error });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort, limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_module_1.default.find(query)
            .sort({ title: sort === 'desc' ? -1 : 1 })
            .limit(Number(limit));
        res.status(200).json({ success: true, message: "Books retrieved successfully", data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve books', error });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const book = yield book_module_1.default.findById({ _id: bookId });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        res.status(404).json({ success: false, message: 'Book not found', error });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const book = yield book_module_1.default.findByIdAndUpdate({ _id: bookId }, { $set: req.body }, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update book', error });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const book = yield book_module_1.default.findByIdAndDelete({ _id: bookId });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete book', error });
    }
});
exports.deleteBook = deleteBook;
