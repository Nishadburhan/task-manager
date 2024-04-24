const express = require("express");
const app = express();
const port = 3000;

const tasks = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/tasks", (req, res) => {
  try {
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({ message: "No tasks available" });
    }
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error occurred while processing tasks request:", error);
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
    console.log(task);
    if(!task.title || !task.description || typeof task.completed !== "boolean") {
        return res.status(400).json({error: "Invalid task data"});
    }

    task.id=tasks.length + 1;
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
        if (!updatedTask.title || !updatedTask.description || typeof updatedTask.completed!== "boolean") {
            return res.status(400).json({ error: "Invalid task data" });
        }

        task.title = updatedTask.title;
        task.description = updatedTask.description;
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
