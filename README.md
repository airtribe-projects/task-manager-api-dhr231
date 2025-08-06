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

Setup Instructions:

1. Clone the repository:
   git clone <repository-url>
   cd <project-folder>

2. Install dependencies:
   npm install

3. (Optional) Install nodemon for auto-reload:
   npm install -g nodemon

4. Run the server:
   nodemon index.js
   or
   node index.js
   The server listens on port 3000 by default.

5. Test the API using Postman, curl, or another HTTP client.

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

PATCH /tasks/:id
Used for partial updates. Fields optional.
Body example:
{
"completed": true,
}
Responses:
200 OK with updated task
400 Bad Request for validation errors
404 Not Found if task not found

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

Examples:
Create task:
POST /tasks
Response: 201 Created with new task

Technologies Used:
• Node.js
• Express.js
• express-validator
• In-memory JS data structure (no database)

License:
MIT License
