require('../models/database')
const Book = require('../models/Book')

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5
    const latest = await Book.find({}).sort({_id: -1}).limit(limitNumber)
    const books = {latest}

    res.render('index', { title: 'Mockingbird - Home', books } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
}

// GET /
// About
exports.about = async(req, res) => {
  try {
   res.render('about', { title: 'Mockingbird - About'} )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
}
// GET
// Contact
exports.contact = async(req, res) => {
  try {
   res.render('contact', { title: 'Mockingbird - Contact'} )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
}
 
/**
 * GET /book/:id
 * Book 
*/
exports.exploreBook = async(req, res) => {
  try {
    let bookId = req.params.id
    const book = await Book.findById(bookId)
    res.render('book', { title: 'Mockingbird - Book', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchBook= async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm
    let book = await Book.find( { $text: { $search: searchTerm, $diacriticSensitive: true } })
    res.render('search', { title: 'Mockingbird - Search', book } )
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" })
  }
  
}

/**
 * GET /explore-latest
 * Explore Latest Books
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 100
    const book = await Book.find({'category': 'book'}).sort({ _id: -1 }).limit(limitNumber)
    res.render('explore-latest', { title: 'Mockingbird - Books', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
}
/**
 * GET /explore-latest-all
 * Explore Latest all
*/
exports.exploreLatestAll = async(req, res) => {
  try {
    const limitNumber = 100
    const book = await Book.find({}).sort({ _id: -1 }).limit(limitNumber)
    res.render('explore-latest-all', { title: 'Mockingbird - All', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
}


/**
 * GET /explore-latest-graphic_novels
 * Explplore Latest graphic novels
*/
exports.exploreLatestGraphicNovels = async(req, res) => {
  try {
    const limitNumber = 100
    const book = await Book.find({ 'category': 'comic' }).sort({_id: -1}).limit(limitNumber)
    res.render('explore-latest-graphic_novels', { title: 'Mockingbird - Graphic Novels / Comics', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
} 

/**
 * GET /explore-latest-Games
 * Explore Latest Games
*/


exports.exploreLatestGames = async(req, res) => {
  try {
    const limitNumber = 100
    const book = await Book.find({ 'category': 'game' }).sort({_id: -1}).limit(limitNumber)
    res.render('explore-latest-games', { title: 'Mockingbird - Games', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
} 

/**
 * GET /explore-latest-micell
 * Explore Latest micell
*/
exports.exploreLatestMicell = async(req, res) => {
  try {
    const limitNumber = 100
    const book = await Book.find({ 'category': 'miscellaneous' }).sort({_id: -1}).limit(limitNumber)
    res.render('explore-latest-micell', { title: 'Mockingbird - Micellaneous', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
} 


/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Book.find().countDocuments()
    let random = Math.floor(Math.random() * count)
    let book = await Book.findOne().skip(random).exec()
    res.render('explore-random', { title: 'Mockingbird - Explore Latest', book } )
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" })
  }
} 


/**
 * GET /submit-book
 * Submit Book
*/
exports.submitBook = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors')
  const infoSubmitObj = req.flash('infoSubmit')
  res.render('submit-book', { title: 'Mockingbird - Submit Book', infoErrorsObj, infoSubmitObj  } )
}

/**
 * POST /submit-book
 * Submit Book on Post
*/
exports.submitBookOnPost = async(req, res) => {
  try {
    const newBook = new Book({
      name: req.body.name,
      description: req.body.description,
      quote: req.body.quote,
      songs: req.body.songs,
      image: req.file.path,
      category: req.body.category
    })
    await newBook.save()

    req.flash('infoSubmit', 'Book has been added.')
    res.redirect('/submit-book')
  } catch (error) {
    req.flash('infoErrors', error)
    res.redirect('/submit-book')
  }

}

/**
 * GET /edit-book
 * Edit Book
*/
exports.editBook = async(req, res) => {
  try{
    let bookId = req.params.id
    const book = await Book.findById(bookId)
    res.render('edit-book', { title: 'Mockingbird - Edit Book', book} )
  }catch(error){
    res.status(500).send({message: error.message || "Error Occured"})
  }
}


/**
 * PUT /edit-book
 * Edit Book on Post
*/
exports.editBookOnPost = async(req, res) => {
  try{
    let bookId = req.params.id

    const book = await Book.findByIdAndUpdate(bookId,{
            name: req.body.name,
            description: req.body.description,
            quote: req.body.quote,
    })
    const song = await Book.findByIdAndUpdate(bookId,
      {$push: {songs: req.body.songs}}
    )

    console.log(req.body.name)
    res.redirect(`/book/${bookId}`)  
  }catch(error){
    console.log(error)
  }

}