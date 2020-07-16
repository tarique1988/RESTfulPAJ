const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const studentRouter = require('./Routers/studentsRouter')


const app = express();

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add Routers
app.use('/students', studentRouter)

// Default route
app.use((req, res)=>{
    res.status(200).json({
        message: "Welcome",
        info: "Our API is under construction!"
    })
});

module.exports = app;