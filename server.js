require('dotenv').config();
const fs = require('node:fs')
const path = require('node:path')

const routes = require('./routing/routing');
const { connectToDatabase } = require('./db');
const {contentParser} = require('fastify-multer');
const upload = require('./upload')

const app = require('fastify')({ 
  logger: true,
  // https: {
  //   key: fs.readFileSync('./certs/server.key'),
  //   cert: fs.readFileSync('./certs/server.crt')
  // }
})

const API_PORT = process.env.API_PORT;



// Static files
app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'static'), // путь к папке с вашими статическими файлами
  prefix: '/static/'                    // префикс URL, по которому будут доступны статические файлы
})

// Parce mimetype when upload files
app.register(contentParser)

// Register routers
routes(app, upload);

// MiddleWare
app.setErrorHandler(require('./middleware/errorHandler')) // Error handlinh
app.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})
//fastify.use(require('frameguard')()) // frame protection
//fastify.use(require('hsts')()) // https
//fastify.use(require('x-xss-protection')()) 


function startServerApi(port) {
  app.listen({ port }, (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

// Run the server!
connectToDatabase()
startServerApi(API_PORT)

