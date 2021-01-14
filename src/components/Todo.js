import React, { useEffect, useState } from "react";
import "../styles/Todo.css";
import TodoList from "./TodoList.js";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    filterTodos();
    saveLocalStorage();
  }, [status, todos]);

  function onInputWrite(input) {
    setTaskInput(input);
  }

  function createTask(e) {
    e.preventDefault();
    if (taskInput.length < 1) return;
    let newTask = [
      ...todos,
      {
        id: Math.floor(Math.random(100) * 1000),
        task: taskInput,
        done: false,
      },
    ];
    setTodos(newTask);
    setTaskInput("");
  }

  function saveLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getLocalStorage() {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let savedLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(savedLocal);
    }
  }

  function deleteTask(id) {
    let filterTask = todos.filter((todo) => todo.id !== id);
    setTodos(filterTask);
  }

  function filterTodos() {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.done === true));
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.done === false));
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  function editTask(id, newTaskName) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTaskName } : todo
      )
    );
  }

  function doneTask(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  return (
    <div className="todo">
      <h2 id="title">Todo App</h2>
      <div className="chatbox__input">
        <form>
          <div className="inputItems">
            <input
              value={taskInput}
              onChange={(e) => onInputWrite(e.target.value)}
              placeholder="What needs to be done ?"
            />
            <div className="button">
              <button onClick={createTask} type="submit">
                Press enter to submit task
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="filterOptions">
        <span
          onClick={() => setStatus("all")}
          className={`${status === "all" && "active"}`}
        >
          view all
        </span>
        <label>/</label>
        <span
          onClick={() => setStatus("uncompleted")}
          className={`${status === "uncompleted" && "active"}`}
        >
          uncompleted
        </span>
        <label>/</label>
        <span
          onClick={() => setStatus("completed")}
          className={`${status === "completed" && "active"}`}
        >
          completed
        </span>
      </div>
      {filteredTodos.map((todo) => (
        <TodoList
          todo={todo}
          deleteTask={deleteTask}
          doneTask={doneTask}
          key={todo.id}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default Todo;
