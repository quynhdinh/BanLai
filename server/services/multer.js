const multer = require('multer');
const fs = require("fs");

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //reject file
        cb({
            message: 'Unsupported file format'
        }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
})

module.exports = upload;