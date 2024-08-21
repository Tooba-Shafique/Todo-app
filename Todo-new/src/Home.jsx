import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import Create from "./Create";
import "./Home.css";
import apiService from "./Utils/axios-services";
// import './Create.css';
function Home() {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        apiService.get('/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        setEditing(id);
    };

    const handleUpdate = (id) => {
        console.log("The id is :", id);
        apiService.put(`/update/${id}`, { task: newTask })

            .then(result => {
                setTodos(todos.map(todo => todo._id === id ? { ...todo, task: newTask } : todo));
                location.reload
                setEditing(null);
                setNewTask(''); // Clear the newTask state
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        console.log("The id is ", id)
        console.log("the todos:", todos)
        apiService.delete(`/delete/${id}`)

            .then(result => {
                setTodos(todos.filter(todo => todo._id !== id));
                location.reload
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <div>
                <h2>Todo List</h2>
            </div>
            <Create onAdd={(newTask) => setTodos([...todos, { task: newTask, id: Math.random(), done: false }])} />
            {
                todos.length === 0 ?
                    <div>
                        <h2>No Record</h2>
                    </div>
                    :
                    todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                {editing === todo._id ? (
                                    <input
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                ) : (
                                    <span><BsPencilFill className='icon' onClick={() => handleEdit(todo._id)} /></span>
                                )}
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                                {editing === todo._id && (
                                    <button onClick={() => handleUpdate(todo._id)}>Update</button>
                                )}
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;