const authMiddleware = require('../middleware/auth.js');
const constants = require('../constants/index.js');
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
            message: errorConstants.STORY.ERROR_ADDING_USER_STORIES,
        });
    }
});

/**
 * Show All Public Stories
 * GET
 * /stories
 */
router.get('/', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: constants.STORY_TYPES.PUBLIC }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('stories/index', { stories });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error adding user story:', error);
        res.render('errors/500', {
            message: errorConstants.STORY.ERROR_FETCHING_PUBLIC_STORIES,
        });
    }
});

module.exports = router;
