module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define(
    "Athlete",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: "Sport ID must be a valid integer.",
          },
        },
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First name cannot be empty.",
          },
          len: {
            args: [1, 50],
            msg: "First name cannot be more than 50 characters.",
          },
          is: {
            args: /^[A-Za-zÅÄÖåäö\s]+$/,
            msg: "First name can only contain letters (A-Z, Å, Ä, Ö) and spaces.",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name cannot be empty.",
          },
          len: {
            args: [1, 50],
            msg: "Last name cannot be more than 50 characters.",
          },
          is: {
            args: /^[A-Za-zÅÄÖåäö\s]+$/,
            msg: "Last name can only contain letters (A-Z, Å, Ä, Ö) and spaces.",
          },
        },
      },
      nickname: {
        type: DataTypes.STRING(50),
        validate: {
          len: {
            args: [1, 50],
            msg: "Nickname cannot be more than 50 characters.",
          },
          is: {
            args: /^[A-Za-zÅÄÖåäö\s]+$/,
            msg: "Nickname can only contain letters (A-Z, Å, Ä, Ö) and spaces.",
          },
        },
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "Birth date must be a valid date.",
          },
        },
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: "Weight must be a valid decimal number (e.g., 70.5 kg).",
          },
          min: {
            args: 40,
            msg: "Weight must be at least 40 kg.",
          },
          max: {
            args: 200,
            msg: "Weight must be less than 200 kg.",
          },
        },
      },
      picture_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            msg: "Picture URL must be a valid web address (e.g., https://example.com/image.jpg).",
          },
        },
      },
    },
    {
      tableName: "athletes",
    }
  );

  Athlete.associate = (models) => {
    Athlete.belongsTo(models.Sport, {
      foreignKey: "sport_id",
      onDelete: "RESTRICT",
    });

    Athlete.hasMany(models.Achievement, {
      foreignKey: "athlete_id",
    });
  };

  return Athlete;
};
