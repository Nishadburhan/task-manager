const express = require("express");
const app = express();
const port = 3000;
const dateNow  = require("./utils");

const tasks = [
    {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "priority": "medium",
    "completed": true,
    "created_at": "2024-04-24",
    "updated_at": null
  },
  {
    "id": 2,
    "title": "Create a new project",
    "description": "Create a project using the Express application generator",
    "priority": "high",
    "completed": true,
    "created_at": "2021-06-15",
    "updated_at": null
  },
  {
    "id": 3,
    "title": "Install nodemon",
    "description": "Install nodemon as a development dependency",
    "priority": "low",
    "completed": true,
    "created_at": "2023-03-10",
    "updated_at": null
  }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", (req, res) => {
    try {
      let filteredTasks = tasks;
      const completed = req.query.completed;
      const sortByDate = req.query.sortByDate;
  
      if (completed !== undefined) {
        const isCompleted = completed.toLowerCase() === "true";
        filteredTasks = tasks.filter(task => task.completed === isCompleted);
      }
      
      if (sortByDate !== undefined && sortByDate.toLowerCase() === "true") {
        filteredTasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
  
      if (filteredTasks.length === 0) {
        return res.status(200).json({ message: "No tasks available" });
      }
      res.status(200).json(filteredTasks);
  
    } catch (error) {
      console.error("Error occurred while processing tasks request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get('/tasks/priority/:level', (req, res) => {
  try {
    const level = req.params.level;
    const task = tasks.filter(task => task.priority === level);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    console.error("Error occurred while processing tasks/priority request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tasks/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).send(task);
    } catch (error) {
      console.error("Error occurred while processing GET /tasks/:id request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/tasks", (req, res) => {
  try {
    const task = req.body;
    task.id=tasks.length + 1;
    task.created_at=task.created_at || dateNow();
    task.updated_at=null;    
    if(!task.title || !task.description || !task.priority || typeof task.completed !== "boolean") {
        return res.status(400).json({error: "Invalid task data"});
    }
    
    tasks.push(task);
    res.status(201).send(task);

  } catch (error) {
    console.error('Error occurred while processing POST /tasks request:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find((task) => task.id === id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = req.body;
        if (!updatedTask.title || !updatedTask.description || !task.priority || typeof updatedTask.completed!== "boolean") {
            return res.status(400).json({ error: "Invalid task data" });
        }

        task.title = updatedTask.title;
        task.description = updatedTask.description;
        task.priority = updatedTask.priority;
        task.updated_at = dateNow();
        task.completed = updatedTask.completed;
        res.status(200).send(task);

    } catch (error) {
        console.error('Error occurred while processing PUT /tasks/:id request:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find((task) => task.id === id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        tasks.splice(tasks.indexOf(task), 1);
        res.status(200).send(task);

    } catch (error) {
        console.error('Error occurred while processing DELETE /tasks/:id request:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
