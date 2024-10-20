module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define(
    "Achievement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      athlete_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: "Athlete ID must be a valid integer.",
          },
        },
      },
      achievement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Achievement cannot be empty.",
          },
          len: {
            args: [1, 255],
            msg: "Achievement cannot be more than 255 characters.",
          },
        },
      },
    },
    {
      tableName: "achievements",
    }
  );

  Achievement.associate = (models) => {
    Achievement.belongsTo(models.Athlete, {
      foreignKey: "athlete_id",
      onDelete: "CASCADE",
    });
  };

  return Achievement;
};
