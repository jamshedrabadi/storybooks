const authMiddleware = require('../middleware/auth.js');
const errorConstants = require('../constants/errors.js');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story.js');

/**
 * Login / Landing Page
 * GET
 * /
 */
router.get('/', authMiddleware.ensureGuest, (req, res) => {
    res.render('login', { layout: 'login' });
});

/**
 * Dashboard Page
 * GET
 * /dashboard
 */
router.get('/dashboard', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching user stories:', error);
        res.render('errors/500', {
            message: errorConstants.STORY.ERROR_FETCHING_USER_STORIES,
        });
    }
});

module.exports = router;
