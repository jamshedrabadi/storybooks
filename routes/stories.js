const authMiddleware = require('../middleware/auth.js');
const constants = require('../constants/index.js');
const errorConstants = require('../constants/errors.js');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story.js');

/**
 * Show All Public Stories (VIEW)
 * GET
 * /stories
 */
router.get('/', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: constants.STORY_TYPES.PUBLIC }).populate('user').sort({ createdAt: 'desc' }).lean();
        return res.render('stories/index', { stories });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching public stories:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_FETCHING_PUBLIC_STORIES });
    }
});

/**
 * Show Add Page (VIEW)
 * GET
 * /stories/add
 */
router.get('/add', authMiddleware.ensureAuth, (req, res) => {
    return res.render('stories/add');
});

/**
 * Process Add Form (API)
 * POST
 * /stories
 */
router.post('/', authMiddleware.ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id; // fetch from passport user into form body data
        await Story.create(req.body);
        return res.redirect('/dashboard');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error adding user story:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_ADDING_USER_STORY });
    }
});

/**
 * Show Edit Page (VIEW)
 * GET
 * /stories/edit/:id
 */
router.get('/edit/:id', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean();
        if (!story) {
            // eslint-disable-next-line no-console
            console.log('Error fetching user story:', { storyId: req.params.id });
            return res.render('errors/404', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
        }
        if (story.user.toString() !== req.user.id.toString()) { // in case user tries to edit someone else's story
            // eslint-disable-next-line no-console
            console.log('Error due to unauthorized access:', { storyId: req.params.id, userId: req.user.id, storyUserId: story.user });
            return res.render('errors/401', { message: errorConstants.UNAUTHORIZED_ACCESS });
        }
        return res.render('stories/edit', { story });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching user story:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
    }
});

/**
 * Process Update Form (API)
 * PUT
 * /stories/:id
 */
router.put('/:id', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).lean();
        if (!story) {
            // eslint-disable-next-line no-console
            console.log('Error fetching user story:', { storyId: req.params.id });
            return res.render('errors/404', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
        }
        if (story.user.toString() !== req.user.id.toString()) { // in case user tries to edit someone else's story
            // eslint-disable-next-line no-console
            console.log('Error due to unauthorized access:', { storyId: req.params.id, userId: req.user.id, storyUserId: story.user });
            return res.render('errors/401', { message: errorConstants.UNAUTHORIZED_ACCESS });
        }
        await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true, // check if model properties are validated before adding
        });
        return res.redirect('/dashboard');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error updating user story:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_UPDATING_USER_STORY });
    }
});

/**
 * Process Delete Form (API)
 * DELETE
 * /stories/:id
 */
router.delete('/:id', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).lean();
        if (!story) {
            // eslint-disable-next-line no-console
            console.log('Error fetching user story:', { storyId: req.params.id });
            return res.render('errors/404', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
        }
        if (story.user.toString() !== req.user.id.toString()) { // in case user tries to delete someone else's story
            // eslint-disable-next-line no-console
            console.log('Error due to unauthorized access:', { storyId: req.params.id, userId: req.user.id, storyUserId: story.user });
            return res.render('errors/401', { message: errorConstants.UNAUTHORIZED_ACCESS });
        }
        await Story.deleteOne({ _id: req.params.id });
        return res.redirect('/dashboard');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error deleting user story:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_DELETING_USER_STORY });
    }
});

/**
 * Show Specific User Story (VIEW)
 * GET
 * /stories/:id
 */
router.get('/:id', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('user').lean();
        if (!story) {
            // eslint-disable-next-line no-console
            console.log('Error fetching user story:', { storyId: req.params.id });
            return res.render('errors/404', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
        }
        return res.render('stories/view', { story });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching user story:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_FETCHING_USER_STORY });
    }
});

/**
 * Show User Page (VIEW)
 * GET
 * /stories/user/:userId
 */
router.get('/user/:userId', authMiddleware.ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId, status: constants.STORY_TYPES.PUBLIC })
            .populate('user').sort({ createdAt: 'desc' }).lean();
        return res.render('stories/index', { stories });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching user\'s public stories:', error);
        return res.render('errors/500', { message: errorConstants.STORY.ERROR_FETCHING_USER_PUBLIC_STORIES });
    }
});

module.exports = router;
