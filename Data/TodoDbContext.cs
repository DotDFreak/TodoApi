using Microsoft.EntityFrameworkCore;

using TodoApi.Models;

namespace TodoApi.Data;

public class TodoDbContext : DbContext
{
    // EF passes in the configured options (provider, connection string) via DI.
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    // Each DbSet maps to a table. This one becomes the "TodoItems" table,
    // with one column per property on TodoItem.
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
}
