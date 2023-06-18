const constants = require('../constants/index.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.js');

/**
 * Initialize Passport Configuration
 * @param {import('passport')} passport - passport
 */
exports.initPassportConfig = (passport) => {
    try {
        const googleAuthData = {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: constants.GOOGLE.CALLBACK_URL,
        };
        passport.use(new GoogleStrategy(googleAuthData, async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                };
                const createdUser = await User.create(newUser);
                done(null, createdUser);
            }
        }));

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            const user = await User.findById(id);
            done(null, user);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error looking for user in DB', error);
        throw error;
    }
};
