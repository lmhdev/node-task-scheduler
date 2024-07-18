const cron = require("node-cron");
const { Task, User } = require("./models");
const transporter = require("./config/nodemailer");
const { Op } = require("sequelize");

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

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const startOfMinute = new Date(now.setSeconds(0, 0));
    const endOfMinute = new Date(now.setSeconds(59, 999));
    const tasks = await Task.findAll({
      where: { scheduledAt: { [Op.between]: [startOfMinute, endOfMinute] } },
    });
    tasks.forEach(async (task) => {
      try {
        const user = await User.findByPk(task.UserId);
        sendEmail(user.email, task);

        if (task.recurrence !== "none") {
          let nextScheduledAt;
          switch (task.recurrence) {
            case "daily":
              nextScheduledAt = new Date(task.scheduledAt);
              nextScheduledAt.setDate(nextScheduledAt.getDate() + 1);
              break;
            case "weekly":
              nextScheduledAt = new Date(task.scheduledAt);
              nextScheduledAt.setDate(nextScheduledAt.getDate() + 7);
              break;
            case "monthly":
              nextScheduledAt = new Date(task.scheduledAt);
              nextScheduledAt.setMonth(nextScheduledAt.getMonth() + 1);
              break;
          }
          await Task.create({
            title: task.title,
            description: task.description,
            scheduledAt: nextScheduledAt,
            recurrence: task.recurrence,
            UserId: task.UserId,
            priority: task.priority,
          });
        }
      } catch (error) {
        console.error(`Failed to process task ${task.id}:`, error);
      }
    });
  } catch (error) {
    console.error("Failed to retrieve tasks:", error);
  }
});
