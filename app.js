const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;
const tasks = [];
let nextId = 1;
let userId = 1;
app.use(express.json());

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};
//To check if server is running.
app.get('/', (req, res) => {
    res.send("Server is running");
});

//POST method
app.post('/tasks',
    [body('title').exists().withMessage('Title is required').isString().withMessage('Title must be a string').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').optional().isString(),
    body('completed').optional().isBoolean(),
        handleValidation
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description = '', completed = false } = req.body;
        const newTask = { id: nextId++, title, description, completed };
        tasks.push(newTask);
        res.status(201).json(newTask);
    }
)

//GET Method for all tasks.
app.get(`/tasks`, (req, res) => {
    res.json(tasks);
})

//GET Method for specific ID. 
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }
    res.json(task);
})

//PATCH Method for specific ID.
app.patch('/tasks/:id',
    [
        body('title').optional().isString().withMessage('Title must be a string').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
        body('description').optional().isString(),
        body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
        handleValidation
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ error: errors.array() });
        }

        const id = parseInt(req.params.id, 10);
        const task = tasks.find(t => t.id === id);
        if (!task) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }

        const { title, description, completed } = req.body;
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;

        res.json(task);
    });


//PUT method implemenation with specific ID
app.put(
    '/tasks/:id',
    [
        body('title').exists().isString().isLength({ min: 3 }),
        body('description').exists().isString(),
        body('completed').exists().isBoolean(),
        handleValidation
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = parseInt(req.params.id, 10);
        const idx = tasks.findIndex(t => t.id === id);
        if (idx === -1) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }

        const { title, description, completed } = req.body;
        const updatedTask = { id, title, description, completed };
        tasks[idx] = updatedTask;

        res.json(updatedTask);
    }
);

//DELETE Method for specific ID.
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }
    tasks.splice(index, 1);
    res.status(204).send(); // No content
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;

