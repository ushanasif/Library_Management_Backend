import { Request, Response } from 'express';
import Borrow from '../modules/borrow.module';
import Book from '../modules/book.module';

export const createBorrowBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'book, quantity and dueDate are required',
      });
    }

    const book = await Book.findById(bookId);

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
    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error,
    });
  }
};


export const getBorrowedBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve borrowed books summary',
      error: error.message || error,
    });
  }
};


