const { Task } = require("../models");
const transporter = require("../config/nodemailer");

const sendEmail = (email, task) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Task Scheduled",
    text: `Your task "${task.title}" is scheduled for ${task.scheduledAt}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.createTask = async (req, res) => {
  const { title, description, scheduledAt, priority } = req.body;
  const file = req.file;
  console.log(req.user);
  try {
    const task = await Task.create({
      title,
      description,
      scheduledAt,
      priority,
      filePath: file ? file.path : null,
      UserId: req.userId,
    });
    sendEmail(req.user.email, task);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
