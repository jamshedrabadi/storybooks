const authMiddleware = require('../middleware/auth.js');
const express = require('express');
const router = express.Router();

// Login / Landing Page (GET) (/)
router.get('/', authMiddleware.ensureGuest, (req, res) => {
    res.render('login', { layout: 'login' });
});

// Dashboard Page (GET) (/dashboard)
router.get('/dashboard', authMiddleware.ensureAuth, (req, res) => {
    res.render('dashboard', {
        name: req.user.firstName,
    });
});

module.exports = router;
