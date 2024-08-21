import React, { useState } from "react";
import axios from 'axios';
import "./Create.css"; // Import the CSS file
import apiService from "./Utils/axios-services";
function Create({ onAdd }) {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (task.trim() === '') {
            setError('Please enter a task');
            return;
        }

        apiService.post('/add', { task: task })
            .then(result => {
                setTask(''); // Clear the input field
                setError(''); // Clear any error message
                onAdd(task); // Add the new task to the list
            })
            .catch(err => {
                setError('Failed to add task');
                console.log("The error is ", err);
            });
    };

    return (
        <div className="create-container">
            <input
                type="text"
                name="task"
                id="task"
                placeholder="Enter your task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="task-input"
            />
            <button type="button" onClick={handleAdd} className="add-button">Add</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Create;