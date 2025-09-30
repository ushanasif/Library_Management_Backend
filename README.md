

# 📚 Library Management


A RESTful Library Management System built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

## 🔥 Features

- 📖 **Book Management**: Create, update, delete, and retrieve books
- 🔍 **Filtering & Sorting**: Filter books by genre, sort results
- 📦 **Borrow System**: Borrow books with availability checks
- 📊 **Aggregation Summary**: View total borrowed quantity per book
- ✅ **Validation**: Robust schema validation with Mongoose
- ⚙️ **Business Logic**: Auto-update availability, enforce copy limits
- 🔐 **Error Handling**: Proper validation and error messages




## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/arafat20mupi/Library-Management.git
cd Library-Management
```

### 📦 Install Dependencies

```
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_uri
```

### ▶️ Run the Server

```bash
# For development
npm run dev

# For production
npm run build && npm start
```

---

## 🛠️ API Endpoints

### 📘 Book APIs

#### ✅ Create Book

```http
POST /api/books
```

**Request Body:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 📚 Get All Books

```http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

#### 🔍 Get Book by ID

```http
GET /api/books/:bookId
```

#### ✏️ Update Book

```http
PUT /api/books/:bookId
```

**Request Body:**

```json
{ "copies": 10 }
```

#### ❌ Delete Book

```http
DELETE /api/books/:bookId
```

---

### 📦 Borrow APIs

#### ✅ Borrow a Book

```http
POST /api/borrow
```

**Request Body:**

```json
{
  "book": "bookObjectIdHere",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 📊 Get Borrow Summary

```http
GET /api/borrow
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 📁 Folder Structure

```
src/
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/
│   ├── book.route.ts
│   └── borrow.route.ts
├── interfaces/
│   ├── book.interface.ts
│   └── borrow.interface.ts
├── app.ts
├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB**
* **Mongoose**

---

## 📺 Video Demo

🎥 [Click here to watch](https://www.youtube.com/watch?v=hIpbAXH_p18)

---

## 🌐 Live Demo

🔗 [Live Link](https://libary-management-nu.vercel.app)

---

## 👨‍💻 Author

**Arafat Islam**
🔗 [Portfolio](https://arafat-islam.vercel.app)
📧 [arafatislam6619@gmail.com](mailto:arafatislam6619@gmail.com)

---

> ⚠️ All code is original. Plagiarism is strictly avoided.

```

---

✅ Let me know if you want a `vercel.json`, `.env.example`, or a ready ZIP of the full project.
```
