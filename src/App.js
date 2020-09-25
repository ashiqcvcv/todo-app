import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todolist from './components/Todolist';
import Form from './components/Form';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, [])
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed': setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted': setFilteredTodos(todos.filter(todo => todo.completed !== true))
        break;
      default:
        setFilteredTodos(todos);
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }
  return (
    <div>
      <header className="App-header">
        <h1>To Do List</h1>
      </header>
      <div className="container">
        <Form
          setStatus={setStatus}
          todos={todos} inputText={inputText}
          setTodos={setTodos} setInputText={setInputText} />
        <Todolist todos={filteredTodos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
