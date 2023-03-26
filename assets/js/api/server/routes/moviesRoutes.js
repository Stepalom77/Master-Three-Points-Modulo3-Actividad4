const express = require('express');
const router = express.Router();
const movies = require("../controllers/moviesController");

router.get("/movies", movies.getAll);
router.post("/movies", movies.create);
router.put("/movies/:id", movies.update);
router.get("/movies/:id", movies.getOne);
router.delete("/movies/:id", movies.delete);

module.exports = router;