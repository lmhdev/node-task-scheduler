module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    recurrence: {
      type: DataTypes.ENUM("none", "daily", "weekly", "monthly"),
      defaultValue: "none",
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User);
  };

  return Task;
};
