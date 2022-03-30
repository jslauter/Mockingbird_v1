const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const multer  = require('multer')
const {storage} = require('../../cloudinary')
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
router.get('/explore-latest-all', bookController.exploreLatestAll)
router.get('/explore-latest-graphic_novels', bookController.exploreLatestGraphicNovels)
router.get('/explore-random', bookController.exploreRandom)
router.get('/explore-latest-games', bookController.exploreLatestGames)
router.get('/explore-latest-micell', bookController.exploreLatestMicell)
router.get('/submit-book', bookController.submitBook)
router.post('/submit-book',upload.single('image'), bookController.submitBookOnPost)
router.get('/edit-book/:id', bookController.editBook)
router.put('/edit-book/:id',bookController.editBookOnPost)
 
module.exports = router