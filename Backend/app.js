require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Models/User');

const listing = require('./Routes/listing');
const review = require('./Routes/review');
const user = require('./Routes/user');
const customError = require('./Utils/Error');


//Connecting MONGO Atlas DATABASE;
const URL = process.env.MONGO_URL;
const Main = async () => {
    await mongoose.connect(URL);
}; Main().then(() => console.log("Mongo Database is Connected ✅")).catch((err) => console.log(err));

app.set("trust proxy", 1);

//Express middlewares -> 
app.use(cors({ origin: 'https://rentify-frontend-nine.vercel.app', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret :  process.env.SECRET,
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : URL,
        crypto : {
            secret : process.env.SECRET,
        },
        touchAfter : 24 * 3600,
    }),
    cookie: {
        secure: true,        // IMPORTANT (because HTTPS)
        httpOnly: true,
        sameSite: "none"     // VERY IMPORTANT
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/listing', listing);
app.use('/listing/:id/review', review);
app.use('/', user);

app.use((req,res,next) => {
    next(new customError(404, 'Page Not Found'));
});


//Error Handling Middleware
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        return res.status(404).json({ message: `Page Not found` });
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(e => e.message);
        return res.status(406).json({ message: message });
    }

    //Operational Error Handling..
    const { status = 500, message = 'something went wrong' } = err;
    return res.status(status).json({ message: message });
});

app.listen(8080, () => {
    console.log('Server is activated on 8080');
});
