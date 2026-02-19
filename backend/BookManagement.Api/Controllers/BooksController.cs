using Microsoft.AspNetCore.Mvc;
using BookManagement.Api.Models;
using BookManagement.Api.Services;

namespace BookManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookService _bookService;

    public BooksController(BookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetAll()
    {
        return Ok(_bookService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Book> GetById(int id)
    {
        var book = _bookService.GetById(id);
        return book == null ? NotFound() : Ok(book);
    }

    [HttpPost]
    public ActionResult<Book> Create([FromBody] Book book)
    {
        var created = _bookService.Add(book);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public ActionResult<Book> Update(int id, [FromBody] Book book)
    {
        var updated = _bookService.Update(id, book);
        return updated == null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id)
    {
        return _bookService.Delete(id) ? NoContent() : NotFound();
    }
}
