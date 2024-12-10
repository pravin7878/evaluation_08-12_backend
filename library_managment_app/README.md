# Library Management System API

A RESTful API to manage a library system with functionality for handling users, books, authors, and borrowings.

## Features

- **User Management**: Admins can manage users (create, update, delete, view).
- **Book Management**: Admins can manage books (add, update, delete, view).
- **Author Management**: Admins can manage authors (add, update, delete, view).
- **Borrowing System**: Members can borrow and return books; Admins can view all transactions.
- **Role-based Access Control**: Different access levels for Admins and Members.

## Tech Stack

- **Node.js**: Backend server.
- **Express**: Web framework.
- **MongoDB**: Database for storing users, books, authors, and transactions.
- **JWT**: For authentication and role-based access control.
- **Mongoose**: ODM for MongoDB.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB database (Local or Cloud)

### Steps to Run the Application

1. **Clone the Repository**

   ```bash
   git clone <repo-url>
   cd <repo-directory>

2. Install Dependencies
     ```
       npm install
     ```

3. Setup Environment Variables

- Create a .env file in the root directory and add the following:
  ```
  PORT=5000
  MONGO_URI=<your-mongo-uri>
  JWT_SECRET=<your-jwt-secret>
  ```

4. Start the Server
     ```
     npm start
     ```
- The application will run on http://localhost:8080.

# API Documentation

## Authentication Routes

### POST `/api/auth/login`
- ****Description**: Authenticates a user with username and password, returning a JWT token.

### POST `/api/auth/register`
- **Description**: Registers a new user (Admin or Member).

---

## User Routes

### GET `/api/users/:id`
- **Access**: Admin and the user themselves.
- **Description**: Retrieve user by ID.
- **Response**: User details.

### PUT `/api/users/:id`
- **Access**: Admin and the user themselves.
- **Description**: Update user information.
- **Request Body**: 
  ```
   {
     "name": "string",
     "email": "string",
     "password": "string"
   }
  ```
### DELETE /api/users/:id
- **Access**: Admin only.
- **Description**: Delete a user.
- **Response**: Success message.


## Author Routes

### POST /api/authors
**Access**: Admin only.
**Description**: Create a new author.
 - *Request Body* :
    ```
       {
         "name": "string",
         "biography": "string",
         "dateOfBirth": "string",
         "nationality": "string"
       }
    ```
- **Response**: Created author details.

### GET /api/authors
**Description**: Retrieve all authors.
Response: List of authors.

### GET /api/authors/:id
   **Description**: Retrieve author by ID.
   Response: Author details including books authored.

### PUT /api/authors/:id
   **Access**: Admin only.
   **Description**: Update author information.
- Request Body:
   ```
     {
        "name": "string",
        "biography": "string",
        "dateOfBirth": "string",
        "nationality": "string"
     }
    ```
**Response**: Updated author details.

### DELETE /api/authors/:id
**Access**: Admin only.
**Description**: Delete an author.
**Response**: Success message.


## Book Routes

### POST /api/books
**Access**: Admin only.
**Description**: Add a new book.
- Request Body:
   ```
       {
         "title": "string",
         "ISBN": "string",
         "summary": "string",
         "publicationDate": "string",
         "genres": ["string"],
         "copiesAvailable": "number",
         "authorId": "string"
       }
   ``` 
**Response**: Created book details.

### GET /api/books
**Description**: Retrieve all books.
**Query Parameters**:
```
   author: Filter by author ID.
   genre: Filter by genre.
   title: Search by title.
   page: Pagination.
   limit: Pagination limit.
```   
**Response** : List of books with pagination info.

### GET /api/books/:id
**Description**: Retrieve book by ID.
**Response**: Book details including author info.


### PUT /api/books/:id
  **Access**: Admin only.
  **Description**: Update book information.
  **Request Body**:
```
    {
      "title": "string",
      "summary": "string",
      "publicationDate": "string",
      "genres": ["string"],
      "copiesAvailable": "number"
    }
```

**Response** : Updated book details.

### DELETE /api/books/:id
**Access**: Admin only.
**Description**: Delete a book.
**Response**: Success message.

## Borrowing Routes
### POST /api/borrowings
**Access**: Member only.
**Description**: Borrow a book.
**Request Body**:
```
  {
    "bookId": "string"
  }
```

**Actions**:
     Decrease copiesAvailable in Book.
     Create a new BorrowingTransaction.
     Add book to user's borrowedBooks.

**Response**: BorrowingTransaction details.

### GET /api/borrowings
   **Access**: Admin only.
   **Description**: Retrieve all borrowing transactions.
   **Response**: List of transactions.

### GET /api/borrowings/
  **Access**: Member only.
  **Description**: Retrieve borrowing history of the logged-in member.
  **Response**: List of transactions.

### PUT /api/borrowings/:id/return
  **Access**: Member and Admin.
  **Description**: Return a borrowed book.
  **Actions**:
   Update returnDate and status in BorrowingTransaction.
   Increase copiesAvailable in Book.
   Remove book from user's borrowedBooks.
**Response**: Updated transaction details.


## Error Handling
**Validation Errors**: Returns a 400 status code with a list of validation messages.
**Unauthorized Access**: Returns a 401 status code.
**Forbidden Access**: Returns a 403 status code.
**Not Found Errors**: Returns a 404 status code.
**Internal Server Errors**: Returns a 500 status code.