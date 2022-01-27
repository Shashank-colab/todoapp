import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'
import { Row, Col, Card } from 'antd'
import "antd/dist/antd.css";
import axios from 'axios'
import { Modal } from 'antd';



function App() {
  const [todos, setTodos] = useState([])
  const getTodos = async () => {
    try {
      const response = await axios.get('/api/v1/todo/')
      const { data } = response
      setTodos(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = async newTodo => {
    try {
      console.log(newTodo)
      await axios.post('/api/v1/todo/', newTodo)
      getTodos()
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = async (todo) => {

    try {
      await axios.put(`/api/v1/todo/${todo.id}/`, todo)
      getTodos()
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (todo) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task",
      onOk: () => {
        try {
          axios.delete(`/api/v1/todo/${todo.id}/`);
          getTodos();
        } catch (err) {
          console.log(err);
        }
        getTodos()
      }
    });
  }



  return (
    <div className='wrapper'>
      
        <Row className='justify-content-center pt-5'>
          <Col>
            <Card className='p-5'>
              <h1>TO-DO App</h1>
              <AddTodo addTodo={addTodo} />
              <Todo todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
            </Card>
          </Col>
        </Row>
    
    </div>
  )
}

export default App;
