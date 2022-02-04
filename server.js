require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const sesion = require('express-session');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 1234;

// DB connection
mongoose
    .connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(resutl => console.log('Connected to database'))
    .catch(err => console.log(err))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(sesion({
    secret: "mendoan goreng",
    saveUninitialized: true,
    resave: false
}));  

app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');

// route prefix
app.use('', require('./routes/routes'));

app.get('/', (req, res)=>{
    res.json({message: "test on"});
})

app.listen(PORT, ()=> console.log('Running on port: ' + PORT));