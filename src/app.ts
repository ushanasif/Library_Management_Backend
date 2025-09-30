import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import bookRoutes from './app/routes/book.route'
import borrowRoutes from './app/routes/borrow.route'

// Middleware 
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://libaryms.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is a simple Library API.')
})


export default app