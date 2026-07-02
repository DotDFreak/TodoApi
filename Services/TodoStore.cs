using TodoApi.Models;

namespace TodoApi.Services;

public class TodoStore
{
    private readonly List<TodoItem> _items = [];
    private int nextId = 1;

    public List<TodoItem> GetAll()
    {
        return _items;
    }

    public TodoItem? GetById(int id)
    {
        return _items.FirstOrDefault( t => t.Id == id );
    }

    public TodoItem? Add(TodoItem item)
    {
        item.Id = nextId++;
        _items.Add(item);
        return item;
    }

    public bool Update(int id, TodoItem newItem)
    {
        var item = GetById(id);
        if(item is null)
        {
            return false;
        }
        item.Title = newItem.Title;
        item.Iscomplete = newItem.Iscomplete;
        return true;
    }

    public bool Delete(int id)
    {
        var item = GetById(id);
        if(item is null)
        {
            return false;
        }
        _items.Remove(item);
        return true;
    }
}