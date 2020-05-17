const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');


dotenv.config();
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, // https를 쓸 때 true
    },
    name: 'rnbck',
}));

const mainRouter = require('./routes/main');

app.use('/', mainRouter);
app.use('/js', express.static(__dirname + '/node_modules/axios/dist'));


app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});