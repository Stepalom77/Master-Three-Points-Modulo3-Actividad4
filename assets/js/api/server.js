const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const sequelize = require('./server/models/database');

const app = express();
const PORT = 5000;

//Database connection
sequelize.authenticate().then(() => {
    console.log('Database connection established successfully');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  sequelize.sync({ alter: true }).then(() => {
    console.log('Database and tables created successfully');
  }).catch(err => {
    console.error('Unable to sync the database:', err);
  });

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
const reviewsRoutes = require('./server/routes/reviewsRoutes')
app.use('/api', reviewsRoutes)
app.get('/', (req, res) => {
    res.send('Servidor en linea');
})

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))