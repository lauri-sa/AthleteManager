// Import DI container
const bottle = require("../config/di-container");

// Desctructure service from DI container
const { Sport } = bottle.container.DB.models;

// Service to get all sports from the database
const getAllSports = async () => {
  return await Sport.findAll();
};

// Service to find a sport by name from the database
const findSportByName = async (sportName) => {
  return await Sport.findOne({
    where: {
      sport_name: sportName,
    },
  });
};

// Service to create a sport to the database
const createSport = async (sportData) => {
  // Check if sport already exists
  const existingSport = await findSportByName(sportData.sport_name);

  // If sport already exists, throw an error
  if (existingSport) {
    throw new ValidationError("Sport already exists.");
  }

  // Create a new sport
  await Sport.create(sportData);

  // Return all sports to the client
  return await getAllSports();
};

// Add the service to the DI container
bottle.provider("SportServices", function () {
  this.$get = function () {
    return {
      getAllSports,
      createSport,
    };
  };
});
