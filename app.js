
const express = require('express');


const app = express();
let tasks = [
    { id: 1, title: "Finish GET /tasks", description: "Write all the boilerplate code for the first endpoint.", completed: true },
    { id: 2, title: "Implement POST", description: "Implement the route to create a new task.", completed: false },
    { id: 3, title: "Go Roaming", description: "Leave the apartment and waste time with friend.", completed: false }
];
const PORT = 3000;

app.use(express.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {

    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(task);
});

app.post('/tasks', (req, res) => {

    const { title, description, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({
            message: 'Invalid request: Title is required and "completed" must be a boolean.'
        });
    }

    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

    const newTask = {
        id: newId,
        title: title,
        description: description || "", 
        completed: completed
    };


    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTaskData = req.body;


    const taskIndex = tasks.findIndex(t => t.id === taskId);


    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task ID not found for update.' });
    }


    if (updatedTaskData.title && typeof updatedTaskData.title !== 'string') {
        return res.status(400).json({ message: 'Invalid title format.' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex], 
        ...updatedTaskData, 
        id: taskId 
    };

    res.status(200).json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task ID not found for deletion.' });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});