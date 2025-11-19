Task Manager API (Node.js + Express)

A simple in-memory task manager REST API built with Node.js and Express.
You can create, read, update, delete, filter, sort, and prioritize tasks.
Great for learning back-end development, REST concepts, and JSON validation.

Overview:
This project is a RESTful API for managing tasks in memory (no database).
Each task has:

- id: auto-incremented integer
- title: string, required, min 3 characters
- description: string, optional
- completed: boolean, defaults to false

Features include querying by completion status, sorting by creation date,
and filtering by priority level.

API Endpoints:

POST /tasks
Request:
POST http://localhost:3000/tasks
Content-Type: application/json
Body:
{
"title": "Do homework",
"description": "Math quiz",
"completed": false,
}
Success response:
201 Created with the new task object including id and createdAt
Error response:
400 Bad Request with validation errors list

GET /tasks
Request:
GET http://localhost:3000/tasks
Success response:
200 OK with array of tasks (possibly filtered or sorted)

GET /tasks/:id
Example: GET http://localhost:3000/tasks/2
Success response: 200 OK with that task object
Error response: 404 Not Found if id doesn’t exist

PUT /tasks/:id
Used for full replace. All fields required.
Body:
{
"title": "New title",
"description": "New desc",
"completed": true,
}
Responses:
200 OK with replaced task
400 Bad Request for validation errors
404 Not Found if id doesn’t exist

DELETE /tasks/:id
Example: DELETE http://localhost:3000/tasks/3
Response:
204 No Content if deleted
404 Not Found if task doesn’t exist
