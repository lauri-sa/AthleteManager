const router = require("express").Router();
const sportsControllers = require("../controllers/sport.controller");

router
  .route("/")
  .get(sportsControllers.getAllSportsController)
  .post(sportsControllers.createSportController);

module.exports = router;
