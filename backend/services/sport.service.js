const bottle = require("../config/di-container");

const { Sport } = bottle.container.DB.models;

const getAllSports = async () => {
  return await Sport.findAll();
};

const findSportByName = async (sportName) => {
  return await Sport.findOne({
    where: {
      sport_name: sportName,
    },
  });
};

const createSport = async (sportData) => {
  const existingSport = await findSportByName(sportData.sport_name);

  if (existingSport) {
    throw new ValidationError("Sport already exists.");
  }

  await Sport.create(sportData);

  return await getAllSports();
};

bottle.provider("SportServices", function () {
  this.$get = function () {
    return {
      getAllSports,
      createSport,
    };
  };
});
