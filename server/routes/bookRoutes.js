const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const multer  = require('multer')
const {storage} = require('./cloudinary')
const upload = multer({storage})


/**
 * App Routes 
*/
router.get('/', bookController.homepage)
router.get('/about', bookController.about)
router.get('/contact', bookController.contact)
router.get('/book/:id', bookController.exploreBook)
router.post('/search', bookController.searchBook)
router.get('/explore-latest', bookController.exploreLatest)
router.get('/explore-random', bookController.exploreRandom)
router.get('/submit-book', bookController.submitBook)
router.post('/submit-book', bookController.submitBookOnPost)
router.get('/edit-book/:id', bookController.editBook)
router.post('/edit-book/:id', bookController.editBookOnPost)
 
module.exports = router