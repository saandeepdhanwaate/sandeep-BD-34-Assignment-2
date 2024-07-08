const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

// tasks/add
function addNewTask(tasks, taskId, text, priority) {
  let newTask = { taskId, text, priority };
  tasks.push(newTask);
  return tasks;
}

app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addNewTask(tasks, taskId, text, priority);
  res.json(result);
});

// tasks
function getAllTasks(tasks) {
  return tasks;
}
app.get("/tasks", (req, res) => {
  let result = getAllTasks(tasks);
  res.json({ task: result });
});

// tasks/sort-by-priority
function getAllTaskByPriority(tasks) {
  let items = tasks.sort(
    (priority1, priority2) => priority1.priority - priority2.priority,
  );
  return items;
}
app.get("/tasks/sort-by-priority", (req, res) => {
  let result = getAllTaskByPriority(tasks);
  res.json({ task: result });
});

// tasks/edit-priority
function getUptatedTask(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = getUptatedTask(tasks, taskId, priority);
  res.json({ task: result });
});

// tasks/edit-text
function getUptatedTask(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = getUptatedTask(tasks, taskId, text);
  res.json({ task: result });
});

// tasks/delete
function deleteTaskById(tasks, taskId) {
  let items = tasks.filter((item) => item.taskId !== taskId);
  return items;
}
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = deleteTaskById(tasks, taskId);
  res.json({ task: result });
});

// tasks/filter-by-priority
function getMatchTasks(tasks, priority) {
  let items = tasks.filter((item) => item.priority === priority);
  return items;
}
app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = getMatchTasks(tasks, priority);
  res.json({ task: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
