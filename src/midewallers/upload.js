const multer = require('multer')

module.exports = multer({
    // dest: './uploads',
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, returnCallback) {
            // returnCallback(error, filename)
            // console.log(file)
            returnCallback(null, file.originalname)
        }
    })
})