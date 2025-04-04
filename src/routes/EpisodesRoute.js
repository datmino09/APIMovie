const express = require("express");
const route = express.Router();
const EpisodesController = require("../controller/EpisodesContrroller");
route.get("/:movie_id", EpisodesController.getByMovieId);
route.post("/",EpisodesController.createEpisodes);
route.put("/:id",EpisodesController.updateEpisodes);
route.delete("/:id",EpisodesController.deleteEpisodes);
module.exports = route;
