using BookManagement.Api.Models;

namespace BookManagement.Api.Services;

public class BookService
{
    private readonly List<Book> _books = new();
    private int _nextId = 1;
    private readonly object _lock = new();

    public BookService()
    {
        // Seed with sample data
        _books.AddRange(new[]
        {
            new Book { Id = _nextId++, Title = "Clean Code", Author = "Robert C. Martin", Isbn = "978-0132350884", PublicationDate = new DateTime(2008, 8, 1) },
            new Book { Id = _nextId++, Title = "Design Patterns", Author = "Gang of Four", Isbn = "978-0201633610", PublicationDate = new DateTime(1994, 10, 21) },
            new Book { Id = _nextId++, Title = "The Pragmatic Programmer", Author = "David Thomas & Andrew Hunt", Isbn = "978-0135957059", PublicationDate = new DateTime(2019, 9, 13) }
        });
    }

    public IEnumerable<Book> GetAll() => _books.ToList();

    public Book? GetById(int id) => _books.FirstOrDefault(b => b.Id == id);

    public Book Add(Book book)
    {
        lock (_lock)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }
    }

    public Book? Update(int id, Book book)
    {
        var existing = GetById(id);
        if (existing == null) return null;

        existing.Title = book.Title;
        existing.Author = book.Author;
        existing.Isbn = book.Isbn;
        existing.PublicationDate = book.PublicationDate;

        return existing;
    }

    public bool Delete(int id)
    {
        var book = GetById(id);
        if (book == null) return false;

        return _books.Remove(book);
    }
}
