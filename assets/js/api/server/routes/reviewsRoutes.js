const express = require('express');
const router = express.Router();
const reviews = require("../controllers/reviewsController");

router.get("/reviews", reviews.getAll);
router.post("/reviews", reviews.create);
router.put("/reviews/:id", reviews.update);
router.get("/reviews/:id", reviews.getOne);
router.delete("/reviews/:id", reviews.delete);

module.exports = router;