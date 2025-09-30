import { Request, Response } from 'express';
import Book from '../modules/book.module';

// 1. Create Book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create book', error });
  }
};


export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sort, limit = 10 } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ title: sort === 'desc' ? -1 : 1 })
      .limit(Number(limit));
    res.status(200).json({ success: true, message: "Books retrieved successfully", data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve books', error });
  }
};


export const getBookById = async (req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Book not found', error });
  }
}


export const updateBook = async (req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(
      { _id: bookId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book updated successfully', data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update book', error });
  }
};


export const deleteBook = async (req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete({ _id: bookId });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete book', error });
  }
};
