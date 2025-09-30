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
exports.getBorrowedBooks = exports.createBorrowBook = void 0;
const borrow_module_1 = __importDefault(require("../modules/borrow.module"));
const book_module_1 = __importDefault(require("../modules/book.module"));
const createBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        if (!bookId || !quantity || !dueDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: 'book, quantity and dueDate are required',
            });
        }
        const book = yield book_module_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Invalid book ID',
            });
        }
        if (book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                error: `Only ${book.copies} copies available`,
            });
        }
        // Deduct copies
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
        // Create borrow record
        const borrow = yield borrow_module_1.default.create({ book: book._id, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to borrow book',
            error,
        });
    }
});
exports.createBorrowBook = createBorrowBook;
const getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_module_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            {
                $unwind: '$bookInfo',
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error: error.message || error,
        });
    }
});
exports.getBorrowedBooks = getBorrowedBooks;
