const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const Todos = require('./models/todos')
const db = mongoose.connection
const todosData = require('./utilities/data')
const todosController = require('./controllers/todos')
const cors = require('cors')
// Environmental Variables //
const app = express()

const mongoURI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001 // because since this will be also working with react and react automattically uses 3000 so we are running this on 3001

//connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true},
    () => console.log('MongoDB connection establish') )
 

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())


// Routes
app.use('/todos', todosController) // we're telling server.js to get the routes from controllers/todos.js


//if you have an app with multiple models you will have multiple controllers

// Seeding the db
app.get('/seed', async (req, res) => {
    await Todos.deleteMany({});
    await Todos.insertMany(todosData);
    res.send('done!');
  });

app.listen(PORT, () => {
    console.log('This message means nothing', PORT)
  })