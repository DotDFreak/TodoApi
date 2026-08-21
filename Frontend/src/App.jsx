import { useState } from 'react'
import './App.css'

function App() {
  const[todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')
  const [id, setId] = useState('')
  const [byId, setById] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [updateMessage, setUpdateMessage] = useState('')
  const [itemById, setItemById] = useState(null)


  const getTodos = async () => {
    try{
      const response = await fetch('http://localhost:5240/api/todo')
      if(!response.ok){
        throw new Error(`Server error: ${response.status}`)
      }
      const data = await response.json()
      setTodos(data)
    } catch (error){
      console.error('Failed to load todos:', error)
    }
  }

  const getItemById = async () => {
    try{
      const response = await fetch(`http://localhost:5240/api/todo/${byId}`)
      if(!response.ok){
        throw new Error(`Server error: ${response.status}`)
      }
      const data = await response.json()
      setItemById(data)
    } catch (error){
      console.error('Failed to load item by ID:', error)
      setItemById(null)
    }
  }

  const createTodo = async () => {
    const newTodo = {
      title,
      description,
      iscomplete: false
    }
  

  const response = await fetch('http://localhost:5240/api/todo',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
})
if(!response.ok){
  const created = await response.json()
  setTodos([...todos, created])
  setTitle('')
  setDesccription('')
}
  }

  const updateTodo = async () => {
    const updatedTodo = {
      title:updatedTitle,
      description: updatedDescription,
      iscomplete: false
    }

    const response = await fetch(`http://localhost:5240/api/todo/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })

    if(response.ok){
      setUpdateMessage('Element found, updated successfully')
    } else {
      setUpdateMessage('Element not found, update failed')
    }
  }
  
  const deleteTodo = async() =>{
    try{
      const response = await fetch(`http://localhost:5240/api/todo/${deleteId}`,{
        method: 'DELETE'
      })
      if(response.ok){
        setTodos(todos.filter(todo => todo.id !== parseInt(deleteId)))
        setDeleteId('')
      } else {
        console.error('Failed to delete element')
      }
    } catch (error) {
      console.error('Error occurred while deleting element:', error)
    }
  }

  const [expanded, setExpanded] = useState({
    getAll: true,
    getId: false,
    create: false,
    update: false,
    delete: false
  })

  const toggleExpander = (key) =>{
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <>
    {/* Get all todos */}
      <div className="expander">
        <button className="expander-title" onClick={() => toggleExpander('getAll')}>
          {expanded.getAll ? 'Hide' : 'Show'} Get all todos
        </button>
        {expanded.getAll && (
          <div className="expander-content">
            {/* Your existing GET div goes here */}
            <button className="customButton" onClick={getTodos}>
              Get data from database
            </button>
            {todos.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
      </div>

      {/* Get by ID */}
      <div className="expander">
        <button className="expander-title" onClick={() => toggleExpander('getId')}>
          {expanded.getId ? 'Hide' : 'Show'} Get element by ID
        </button>
        {expanded.getId && (
          <div className="expander-content">
            {/* Your existing GET BY ID div goes here */}
            <input className="textBox" value={byId} onChange={(e) => setById(e.target.value)} placeholder="Enter ID" />
            <button className="customButton" onClick={getItemById}>
              Get element by ID
            </button>
            <p>{itemById ? `${itemById.title} | ${itemById.description}` : 'Element not found'}</p>
          </div>
        )}
      </div>

      {/* Create */}
      <div className="expander">
        <button className="expander-title" onClick={() => toggleExpander('create')}>
          {expanded.create ? 'Hide' : 'Show'} Add new element
        </button>
        {expanded.create && (
          <div className="expander-content">
            {/* Your existing CREATE div goes here */}
            <input className="textBox" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            <input className="textBox" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            <button className="customButton" onClick={createTodo}>
              Add new element
            </button>
          </div>
        )}
      </div>

      {/* Update */}
      <div className="expander">
        <button className="expander-title" onClick={() => toggleExpander('update')}>
          {expanded.update ? 'Hide' : 'Show'} Update element
        </button>
        {expanded.update && (
          <div className="expander-content">
            {/* Your existing UPDATE div goes here */}
            <input className="textBox" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
            <input className="textBox" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} placeholder="Enter title" />
            <input className="textBox" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} placeholder="Enter description" />
            <button className="customButton" onClick={updateTodo}>
              Update element by id
            </button>
            <p>{updateMessage}</p>
          </div>
        )}
      </div>

      {/* Delete */}
      <div className="expander">
        <button className="expander-title" onClick={() => toggleExpander('delete')}>
          {expanded.delete ? 'Hide' : 'Show'} Delete element
        </button>
        {expanded.delete && (
          <div className="expander-content">
            {/* Your DELETE div - you'll need to create this */}
            <input className="textBox" value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)} 
                    placeholder="Enter ID to delete" />
            <button className="customButton" onClick={deleteTodo}>
              Delete element
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
