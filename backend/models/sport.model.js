module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define(
    "Sport",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sport_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Sport name cannot be empty.",
          },
          len: {
            args: [1, 100],
            msg: "Sport name cannot be more than 100 characters.",
          },
        },
      },
    },
    {
      tableName: "sports",
    }
  );

  return Sport;
};
