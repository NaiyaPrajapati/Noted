require('dotenv').config()
const express = require('express')
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express()

// get all routes
const authRoutes = require('./routes/authRoute')
const noteRoutes = require('./routes/noteRoute')

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors & helmet
app.use(cors());


// connect database
require('./database/database')();


// for testing purpose
app.get('/', (_, res) => {
    res.send("Hello Naiya here")
})

// user all routes
app.use('/auth', authRoutes)
app.use('/note', noteRoutes)

// listen server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
