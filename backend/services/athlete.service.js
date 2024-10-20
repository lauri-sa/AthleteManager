// Import required modules
const bottle = require("../config/di-container");
const { ValidationError } = require("sequelize");

// Destructure sequelize from DI container
const { sequelize } = bottle.container.DB;

// Destructure models from DI container
const { Athlete, Achievement, Sport } = bottle.container.DB.models;

// Service to get all athletes from the database
const getAllAthletes = async () => {
  return await Athlete.findAll({
    include: [{ model: Sport }, { model: Achievement }], // Include the Sport and Achievement models
  });
};

// Service to find an athlete by ID
const findAthleteByID = async (AthleteID) => {
  return await Athlete.findByPk(AthleteID);
};

// Service to find an athlete by details (first name, last name, birth date)
const findAthleteByDetails = async (firstName, lastName, birthDate) => {
  return await Athlete.findOne({
    where: {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
    },
  });
};

// Service to create an athlete
const createAthlete = async (athleteData) => {
  // Get the athlete by details from the database
  const existingAthlete = await findAthleteByDetails(
    athleteData.first_name,
    athleteData.last_name,
    athleteData.birth_date
  );

  // If the athlete already exists, throw a validation error
  if (existingAthlete) {
    throw new ValidationError("Athlete already exists.");
  }

  // Create the athlete and achievements in a transaction
  await sequelize.transaction(async (t) => {
    await Athlete.create(athleteData, {
      include: [{ model: Achievement }],
      transaction: t,
    });

    return;
  });

  // Return all athletes from the database
  return await getAllAthletes();
};

// Service to update an athlete
const updateAthlete = async (athleteID, athleteData) => {
  // Get the athlete by ID from the database
  const existingAthlete = await findAthleteByID(athleteID);

  // If the athlete does not exist, throw a validation error
  if (!existingAthlete) {
    throw new ValidationError("Athlete not found.");
  }

  // Update the athlete and achievements in a transaction
  await sequelize.transaction(async (t) => {
    await Athlete.update(athleteData, {
      where: { id: athleteID }, // Update the athlete by ID
      transaction: t,
    });

    // Get all achievements for the athlete
    const existingAchievements = await Achievement.findAll({
      where: { athlete_id: athleteID },
      transaction: t,
    });

    // Compare the existing achievements with the updated achievements to find the achievements to delete.
    // If the existing achievement is not in the updated achievements, it should be deleted.
    const achievementsToDelete = existingAchievements.filter(
      (existingAchievement) => {
        return !athleteData.Achievements.some((updatedAchievement) => {
          return updatedAchievement.id === existingAchievement.id;
        });
      }
    );

    // If there are achievements to delete, delete them
    if (achievementsToDelete.length > 0) {
      await Achievement.destroy({
        where: { id: achievementsToDelete.map((a) => a.id) }, // Delete the achievements by ID
        transaction: t,
      });
    }

    // Create or update the achievements for the athlete
    await Achievement.bulkCreate(athleteData.Achievements, {
      updateOnDuplicate: ["achievement"],
      validate: true,
      transaction: t,
    });

    return;
  });

  // Return all athletes from the database
  return await getAllAthletes();
};

// Service to delete an athlete
const deleteAthlete = async (athleteID) => {
  // Get the athlete by ID from the database
  const existingAthlete = await findAthleteByID(athleteID);

  // If the athlete does not exist, throw a validation error
  if (!existingAthlete) {
    throw new ValidationError("Athlete not found or already deleted.");
  }

  // Delete the athlete by ID
  await Athlete.destroy({
    where: {
      id: athleteID,
    },
  });

  // Return all athletes from the database
  return await getAllAthletes();
};

// Add the services to the DI container
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
