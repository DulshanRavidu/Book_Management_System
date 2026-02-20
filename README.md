# Book Management System

A modern web application for managing a list of books, built with **Angular** (frontend) and **ASP.NET Core** (backend).

## Features

- **View** all books in a responsive card grid
- **Add** new books with a modal form
- **Edit** existing books
- **Delete** books with confirmation
- **Search** by title, author, or ISBN
- In-memory data storage (backend)
- RESTful API with full CRUD support

## Project Structure

```
Booking_Management system/
├── backend/                    # ASP.NET Core Web API
│   └── BookManagement.Api/
│       ├── Controllers/        # BooksController
│       ├── Models/             # Book model
│       ├── Services/           # BookService (in-memory)
│       └── Program.cs
├── frontend/                   # Angular 17 application
│   └── src/
│       └── app/
│           ├── components/     # Book list, Book form
│           ├── models/         # Book interface
│           └── services/      # BookService (HTTP client)
└── README.md
```

## Book Model

| Property        | Type   |
|----------------|--------|
| id             | number |
| title          | string |
| author         | string |
| isbn           | string |
| publicationDate| date   |

## Getting Started


### Run the Backend

```bash
cd backend/BookManagement.Api
dotnet run
```

API runs at:
- HTTP: http://localhost:5001
- Swagger UI: http://localhost:5001/swagger

### Run the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: http://localhost:4200

### Usage

1. Start the backend first, then the frontend.
2. Open http://localhost:4200 in your browser.
3. Use **Add Book** to create new entries.
4. Use **Edit** / **Delete** on each book card.
5. Use the search box to filter books.

## Technology Stack

- **Frontend:** Angular 17, TypeScript, SCSS
- **Backend:** ASP.NET Core 8, C#
- **API:** REST (GET, POST, PUT, DELETE)
- **Storage:** In-memory list (no database)
