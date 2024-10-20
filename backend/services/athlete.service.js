const bottle = require("../config/di-container");
const { ValidationError } = require("sequelize");

const { sequelize } = bottle.container.DB;

const { Athlete, Achievement, Sport } = bottle.container.DB.models;

const getAllAthletes = async () => {
  return await Athlete.findAll({
    include: [{ model: Sport }, { model: Achievement }],
  });
};

const findAthleteByID = async (AthleteID) => {
  return await Athlete.findByPk(AthleteID);
};

const findAthleteByDetails = async (firstName, lastName, birthDate) => {
  return await Athlete.findOne({
    where: {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
    },
  });
};

const createAthlete = async (athleteData) => {
  const existingAthlete = await findAthleteByDetails(
    athleteData.first_name,
    athleteData.last_name,
    athleteData.birth_date
  );

  if (existingAthlete) {
    throw new ValidationError("Athlete already exists.");
  }

  await sequelize.transaction(async (t) => {
    await Athlete.create(athleteData, {
      include: [{ model: Achievement }],
      transaction: t,
    });

    return;
  });

  return await getAllAthletes();
};

const updateAthlete = async (athleteID, athleteData) => {
  const existingAthlete = await findAthleteByID(athleteID);

  if (!existingAthlete) {
    throw new ValidationError("Athlete not found.");
  }

  await sequelize.transaction(async (t) => {
    await Athlete.update(athleteData, {
      where: { id: athleteID },
      transaction: t,
    });

    const existingAchievements = await Achievement.findAll({
      where: { athlete_id: athleteID },
      transaction: t,
    });

    const achievementsToDelete = existingAchievements.filter(
      (existingAchievement) => {
        return !athleteData.Achievements.some((updatedAchievement) => {
          return updatedAchievement.id === existingAchievement.id;
        });
      }
    );

    if (achievementsToDelete.length > 0) {
      await Achievement.destroy({
        where: { id: achievementsToDelete.map((a) => a.id) },
        transaction: t,
      });
    }

    await Achievement.bulkCreate(athleteData.Achievements, {
      updateOnDuplicate: ["achievement"],
      validate: true,
      transaction: t,
    });

    return;
  });

  return await getAllAthletes();
};

const deleteAthlete = async (athleteID) => {
  const existingAthlete = await findAthleteByID(athleteID);

  if (!existingAthlete) {
    throw new ValidationError("Athlete not found or already deleted.");
  }

  await Athlete.destroy({
    where: {
      id: athleteID,
    },
  });

  return await getAllAthletes();
};

bottle.provider("AthleteServices", function () {
  this.$get = function () {
    return {
      getAllAthletes,
      createAthlete,
      updateAthlete,
      deleteAthlete,
    };
  };
});
