const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: '../frontend/public/uploads/',
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

// const fileFilter = (req, file, cb) => {
//     const allowedFilTypes = ['images/jpeg', 'images/jpg', 'images/png']

//     if(allowedFilTypes.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

let upload = multer({
    storage
})

module.exports = upload