using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TodoApi.Models;
using TodoApi.Data;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext _db;

    public TodoController(TodoDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
    {
        return Ok(await _db.TodoItems.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetById(int id)
    {
        var item = await _db.TodoItems.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> Create(TodoItem item)
    {
        _db.TodoItems.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new {id = item.Id}, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TodoItem newItem)
    {
        var item = await _db.TodoItems.FindAsync(id);
        if (item is null)
        {
            return NotFound();
        }
        
        item.Title = newItem.Title;
        item.Iscomplete = newItem.Iscomplete;
        item.Description = newItem.Description;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.TodoItems.FindAsync(id);
        if (item is null)
        {
            return NotFound();
        }

        _db.TodoItems.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}