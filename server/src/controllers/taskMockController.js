import { tasks } from "../models/taskMockModel.js";

export const getTasks = (req, res) => {
  const status = req.query.status;
  if (status) {
    res.json(tasks.filter((task) => task.status === status));
  } else {
    res.json(tasks);
  }
};

export const createTask = (req, res) => {
  const taskId = tasks.length
    ? Math.max(...tasks.map((task) => task.id)) + 1
    : 1;
  const task = {
    id: taskId,
    ...req.body,
    dueDate: new Date(req.body.dueDate),
  };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = { ...req.body, dueDate: new Date(req.body.dueDate) };

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { id: taskId, ...task };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

export const patchTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updates = req.body;

  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    Object.assign(task, updates);
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json(`Task ${taskId} deleted`);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
