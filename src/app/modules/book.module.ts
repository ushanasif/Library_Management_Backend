import { model, Schema } from "mongoose";
import validator from 'validator';
import { IBook } from "../interface/book.interface";


const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        validate: {
            validator: (val: string) =>
                validator.isLength(val, { min: 1, max: 200 }),
            message: 'Title must be 1–200 characters long'
        }
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        validate: {
            validator: (val: string) =>
                validator.isLength(val, { min: 1, max: 100 }),
            message: 'Author must be 1–100 characters long'
        }
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: [true, 'Genre is required']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    description: {
        type: String,
        validate: {
            validator: (val: string) =>
                val == null || validator.isLength(val, { max: 500 }),
            message: 'Description must be at most 500 characters'
        }
    },
    copies: {
        type: Number,
        required: [true, 'Number of copies is required'],
        min: [0, 'Copies must be a non-negative integer'],
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be an integer'
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});


const Book = model('Book', bookSchema);

export default Book;
