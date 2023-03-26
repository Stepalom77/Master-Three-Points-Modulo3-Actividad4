const db = require('../models/database')
const reviews = db.models.reviews

const getReviews = async (req, res) => {
  let allReviews = [];
  try {
    allReviews = await reviews.findAll();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Huvo un error" })
  }

  return res.status(200).json(allReviews)
}

const getReview = async (req, res,) => {
  let reviewId = req.params.id;
  let searchedReview = null;

  try {
    searchedReview = await reviews.findOne({
      where: { id: reviewId }
    });

  } catch (error) {
    console.error(err);
    if (!searchedReview) {
      return res.status(404).json({ message: "The review you are looking for does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(searchedReview)
}



const createReview = async (req, res) => {
  let createdReview = null;
  try {
    createdReview = await reviews.create({ ...req.body });
  } catch (err) {
    console.error(err);
    if (err) {
      return res.status(400).json({ message: "There was an error" });
    }
  }

  return res.status(201).json(createdReview);
}

const updateReview = async (req, res) => {
  let reviewId = req.params.id;
  let { username, title, movieTitle, description } = req.body;
  let reviewToUpdate = null;
  try {
    reviewToUpdate = await reviews.findByPk(reviewId)
    reviewToUpdate = await reviews.update({
        username: username,
        title: title,
        movieTitle: movieTitle,
        description: description
    },
      {
        where: {
          id: reviewId
        }
      })
  } catch (err) {
    console.error(err);
    if (!reviewToUpdate) {
      return res.status(404).json({ message: 'The review you are trying to update does not exists' })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(reviewToUpdate)
}

const deleteReview = async (req, res) => {
  let reviewId = req.params.id;
  let deleteReview = null;
  try {
    deleteReview = await reviews.destroy({
      where: {
        id: reviewId
      }
    });
  } catch (err) {
    console.error(err);
    if (!deleteReview) {
      return res.status(404).json({ message: "The review you are trying to delete does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(204).json({ message: "The review has been deleted" })
}

module.exports = {
  getAll: getReviews,
  getOne: getReview,
  create: createReview,
  update: updateReview,
  delete: deleteReview
}