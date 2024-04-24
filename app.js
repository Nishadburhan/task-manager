const express = require("express");
const app = express();
const port = 3000;
const { uuidv4, uuid } = require("uuidv4");

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

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
