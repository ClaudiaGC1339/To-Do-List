import './App.css';
import React, {useState} from 'react';

function App() {
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [editId, setEditId] = useState(0);

function handleSubmit(e){
  e.preventDefault();

  if(editId){
    const editTodo= todos.find((i) => i.id === editId)
    // mapping through the todo list 
    const updatedTodos = todos.map((t) => 
    // asking with '?' if it is the todo that we are trying to update
      t.id === editTodo.id ?
      // if it is, then provide the original id and the todo (whatever is written inside the input box)
        ( t= {id: t.id, todo} )
        // otherwise provide default value (the normal id and the original todo input)
        : {id: t.id, todo: t.todo}
    );
    setTodo(updatedTodos);
    setEditId(0);
    setTodo("");
    return;
  }

  if(todo !== ''){
    setTodos([{id: `${todo}-${Date.now()}` , todo }, ...todos])
    setTodo("");
  }
};

function handleDelete(id){
  const delTodo = todos.filter((to) => to.id !== id);
  setTodos([...delTodo]);
};

function handleEdit(id){
  const editTodo = todos.find((i) => i.id === id);
  setTodo(editTodo.todo)
  setEditId(id);
};


  return (
    <div className="App">
    <div className='container'>
      <h1>Todo List</h1>
      <form className='todoForm' onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type='submit'>{editId ?"Edit" : "Add"}</button>
      </form>


      <ul className='allTodos'>
        {
          todos.map((t) => (
            <li className='singleTodo'>
          <span className='todoText' key={t.id}>{t.todo}</span>
          <button onClick={() => handleEdit(t.id)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </li>
          ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
