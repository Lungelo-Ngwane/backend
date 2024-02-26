const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const {
    getPlacesById,
    getPlaceByUserId,
    createPlace,
    updatePlace,
    deletePlace
} = require('../controllers/places-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:pid', getPlacesById);

router.get('/user/:uid', getPlaceByUserId);

router.use(checkAuth);

router.post('/',
    fileUpload.single('image'),
    [
        check('title').notEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').notEmpty(),
    ], createPlace);

router.patch('/:pid',
    [
        check('title').notEmpty(),
        check('description').isLength({ min: 5 }),
    ], updatePlace);

router.delete('/:pid', deletePlace);

module.exports = router;