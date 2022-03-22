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
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20
    const book = await Book.find({}).sort({ _id: -1 }).limit(limitNumber)
    res.render('explore-latest', { title: 'Mockingbird - Explore Latest', book } )
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

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.')
    } else {
      console.log(req.file)
      imageUploadFile = req.files.image
      newImageName = Date.now() + imageUploadFile.name

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err)
      })

    }

    const newBook = new Book({
      name: req.body.name,
      description: req.body.description,
      quote: req.body.quote,
      songs: req.body.songs,
      image: newImageName
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


// try {
//   let bookId = req.params.id
//   const book = await Book.findById(bookId)
//   res.render('book', { title: 'Mockingbird - Book', book } )
// } catch (error) {
//   res.status(500).send({message: error.message || "Error Occured" })
// }




/**
 * PUT /edit-book
 * Edit Book on Post
*/
exports.editBookOnPost = async(req, res) => {
  try {

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.')
    } else {
      console.log(req.file)
      imageUploadFile = req.files.image
      newImageName = Date.now() + imageUploadFile.name

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err)
      })

    }

    const newBook = new Book({
      name: req.body.name,
      description: req.body.description,
      quote: req.body.quote,
      songs: req.body.songs,
      image: newImageName
    })
    
    await newBook.save()

    req.flash('infoSubmit', 'Book has been added.')
    res.redirect('/edit-book')
  } catch (error) {
    req.flash('infoErrors', error)
    res.redirect('/edit-book')
  }
}