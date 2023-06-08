const authMiddleware = require('../middleware/auth.js');
const errorConstants = require('../constants/errors.js');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story.js');

/**
 * Show Add Page
 * GET
 * /stories/add
 */
router.get('/add', authMiddleware.ensureAuth, (req, res) => {
    res.render('stories/add');
});

/**
 * Process Add Form
 * POST
 * /stories
 */
router.post('/', authMiddleware.ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id; // fetch from passport user into form body data
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error adding user story:', error);
        res.render('errors/500', {
            message: errorConstants.STORY.ERROR_ADDING,
        });
    }
});

module.exports = router;
