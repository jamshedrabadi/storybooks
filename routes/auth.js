const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth (GET) (/auth/google)
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google Auth Callback (GET) (/auth/google/callback)
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

// Logout User (GET) (/auth/logout)
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) { return next(error); }
        res.redirect('/');
    });
});

module.exports = router;
