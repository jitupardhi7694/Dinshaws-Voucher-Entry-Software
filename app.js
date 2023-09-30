const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const app = express();
const sessionStore = require('./helpers/init-sessionStore');
const ensureAuthenticated =
    require('./helpers/auth-helper').ensureAuthenticated;

const PORT = process.env.PORT || 4000;

require('dotenv').config();
require('./helpers/init-passport')(passport);

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main_layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ limit: '60mb', extended: false }));

// Generate a secret key

// Session configuration
const hour = 60 * 60 * 1000; // (60min * (60sec *1000millisecond)
const halfHour = hour / 2;
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        store: sessionStore,
        name: 'sessionID',
        secret: 'Gvv8V}CGBk5-r;RK}}z))e{#S:%aG1U+%t8;b0epoT57|;9k4bVy]mG8cm=}Dinshaws',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: halfHour },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(flash());

// Global Variables using custom middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.userDataName = req.user;
    res.locals.userAgent = req.useragent;
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// force to use https on heroku
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else next();
    });
}

// routes
app.use('/', require('./routes/homeRoute'));
app.use('/digital-voucher', require('./routes/voucherRoute'));
app.use('/users', require('./routes/usersRoute'));
app.use('/user_roles', ensureAuthenticated, require('./routes/userRolesRoute'));

app.listen(PORT, async (err) => {
    if (err) throw err;
    else {
        await console.log(`server running on port http://localhost:${PORT}`);
    }
});
