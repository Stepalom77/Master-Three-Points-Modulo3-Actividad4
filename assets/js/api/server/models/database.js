const Sequelize = require('sequelize');
const ReviewsModel = require('./reviews');
const MoviesModel = require('.//movies');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};
db.sequelize = sequelize;
db.Reviews = ReviewsModel(sequelize, Sequelize);
db.Movies = MoviesModel(sequelize, Sequelize);

module.exports = sequelize;