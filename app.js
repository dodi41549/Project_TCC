const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const corsOptions = {
    origin: "http://localhost:4000"
}

app.use(cors(corsOptions));

const morgan = require('morgan');
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/views'));

const router = require('./routes');

app.set('view engine', 'ejs');

app.use(router); 

// 404
app.use((req, res, next) => {
    return res.status(404).json({
        message: "404 Not Found!"
    });
});

// 500
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});