# Mockingbird

Allows for the listening and creation of user-curated music playlists to set the mood/ambience for the book you're reading

**Link to project:** http://mocking-bird.co/

![MB Frontpage](https://i.imgur.com/OiQpTT1.png)

## How It's Made:
**Tech used:** HTML, Bootstrap, CSS, JavaScript, EJS, Node.js, Express, Mongoose, Mongodb

Mockingbird is a fullstack, CRUD application.  For the front end I utilized Bootstrap.  All images are hosted on Cloudinary, linked to Mongodb.  The playlists are created and added to using a youtube link that creates anonymous, shareble playlists based on Youtube IDs contributed via Youtube links by users.  


## Future Improvements

Future implementation of the Youtube API is very likely.  This will allow for more flexibility.  The possibility of user-curated removal of songs that may not be fitting for the specific book: likes, dislikes etc. Also, the displaying of current song playing. Autoplay is also a possibilty.

Other APIs to be included in future releases are Openlibrary which will be used to auto create listings for the most popular X number of books, which will auto-populate all fields: book name, book cover image, quote, synopsis.  Of course, all fields will be able to be edited by the community

Also, categories will be added for boardgames and "other". If boardgames are included the boardgamegeek API will be implemented to auto create listings for board games

Authorization will be added as well which will allow users to: see the listings they've created, see the playlists they've favorited.

