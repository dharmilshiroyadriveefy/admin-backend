const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// Middleware
app.use(express.json());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user); // Save user in session
});

passport.deserializeUser((user, done) => {
    done(null, user); // Retrieve user from session
});

// Configure Passport with Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
	    passReqToCallback: true
        },
        (req,accessToken, refreshToken, profile, done) => {
            return done(null, profile); // Authenticate user
        }
    )
)