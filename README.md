
#Airtribe Task-Manager Application

## Description

Task Manager is a simple backend application designed for managing tasks. It provides endpoints for creating, updating, deleting, and retrieving tasks, as well as filtering tasks by completion status and priority level.

## Installation

1.Clone the repository

    git clone https://github.com/Nishadburhan/task-manager
    
2.Navigate to the project directory
    
    cd task-manager

3.Install dependencies

    npm install

4.Start the server

    npm run dev

---

## Endpoints

- **GET /tasks**
    - Retrieve all tasks.
    - Query Parameters:
        - `completed`: Filter tasks by completion status (true/false).
        - `sortByDate`: Sort tasks by creation date (true/false).
    - Example: `GET /tasks?completed=true&sortByDate=true`

- **GET /tasks/priority/:level**
    - Retrieve tasks by priority level.
    - Path Parameters:
        - `level`: Priority level of the tasks (high/medium/low).
    - Example: `GET /tasks/priority/high`

- **GET /tasks/:id**
    - Retrieve a specific task by ID.
    - Path Parameters:
        - `id`: ID of the task.
    - Example: `GET /tasks/1`

- **POST /tasks**
    - Create a new task.
    - Request Body:
    ```json
    {
    "title": "Task Title",
    "description": "Task Description",
    "priority": "high/medium/low",
    "completed": true/false
    }
    ```

- **PUT /tasks/:id**
    - Update an existing task by ID.
    - Path Parameters:
        - `id`: ID of the task.
    - Request Body:
    ```json
    {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "priority": "high/medium/low",
    "completed": true/false
    }
    ```

- **DELETE /tasks/:id**
    - Delete a task by ID.
    - Path Parameters:
        - `id`: ID of the task.


## Contact

For any inquiries or feedback, please contact Mohammed Nishad at nishadburhanofficial@gmail.com .