const router = require("express").Router();
const athleteControllers = require("../controllers/athlete.controller");
const { checkCacheMiddleware, setCacheMiddleware } = require('../middlewares/cache.middleware');

router
  .route("/")
  .get(checkCacheMiddleware, athleteControllers.getAllAthletesController, setCacheMiddleware)
  .post(athleteControllers.createAthleteController, setCacheMiddleware);

router
  .route("/:id")
  .put(athleteControllers.updateAthleteController, setCacheMiddleware)
  .delete(athleteControllers.deleteAthleteController, setCacheMiddleware);

module.exports = router;
