const db = require('../models/database')
const movies = db.models.movies

const getMovies = async (req, res) => {
  let allMovies = [];
  try {
    allMovies = await movies.findAll();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Huvo un error" })
  }

  return res.status(200).json(allMovies)
}

const getMovie = async (req, res,) => {
  let movieId = req.params.id;
  let searchedMovie = null;

  try {
    searchedMovie = await movies.findOne({
      where: { id: movieId }
    });

  } catch (error) {
    console.error(err);
    if (!searchedMovie) {
      return res.status(404).json({ message: "The movie you are looking for does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(searchedMovie)
}



const createMovie = async (req, res) => {
  let createdMovie = null;
  try {
    createdMovie = await movies.create({ ...req.body });
  } catch (err) {
    console.error(err);
    if (err) {
      return res.status(400).json({ message: "There was an error" });
    }
  }

  return res.status(201).json(createdMovie);
}

const updateMovie = async (req, res) => {
  let movieId = req.params.id;
  let { title, description, image } = req.body;
  let movieToUpdate = null;
  try {
    movieToUpdate = await movies.findByPk(movieId)
    movieToUpdate = await movies.update({
        title: title,
        description: description,
        image: image
    },
      {
        where: {
          id: movieId
        }
      })
  } catch (err) {
    console.error(err);
    if (!movieToUpdate) {
      return res.status(404).json({ message: 'The movie you are trying to update does not exists' })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(200).json(movieToUpdate)
}

const deleteMovie = async (req, res) => {
  let movieId = req.params.id;
  let deleteMovie = null;
  try {
    deleteMovie = await movies.destroy({
      where: {
        id: movieId
      }
    });
  } catch (err) {
    console.error(err);
    if (!deleteMovie) {
      return res.status(404).json({ message: "The movie you are trying to delete does not exists" })
    } else {
      return res.status(400).json({ message: "There was an error" })
    }
  }
  return res.status(204).json({ message: "The movie has been deleted" })
}

module.exports = {
  getAll: getMovies,
  getOne: getMovie,
  create: createMovie,
  update: updateMovie,
  delete: deleteMovie
}