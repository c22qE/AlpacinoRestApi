// Files uploads
const multer = require('fastify-multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/')
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4() + "." + file.mimetype.split('/')[1]
    cb(null, uniqueFilename)
  }
})
const upload = multer({ storage: storage })


module.exports = upload