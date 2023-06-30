import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const backendServer = "http://127.0.0.1:8001/";

function App() {
  const [todos, setTodos] = useState([]);

// Using native fetch api:

 // useEffect(() => {
 //     fetch(`${backendServer}api/todos/`)
 //         .then(res => res.json())
 //         .then(result => {
 //             setData(result);
 //         })
 // }, []); //provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.
 //
    // Using axios:
 useEffect(() => {
     const fetchData = async () => {
         try {
             const result = await axios(`${backendServer}api/todos/`, );
             setTodos(result.data);
         } catch (error) {
             alert("Something went wrong");
         }
     };
     fetchData().then(data => console.log(data));
 }, []); //provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.

  return (
     <div style={{backgroundColor: "slategray"}}>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: "20px",  }}>
        <Container>
          <Navbar.Brand href="#">
              <img
                  alt="todo_logo"
                  src="/todo_logo.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
              />{'     '}
              Todo App
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;
