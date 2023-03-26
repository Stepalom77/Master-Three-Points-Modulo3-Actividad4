const Sequelize = require('sequelize');
const ReviewsModel = require('./reviews');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};
db.sequelize = sequelize;
db.Reviews = ReviewsModel(sequelize, Sequelize);

module.exports = sequelize;