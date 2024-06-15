const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const sizeRoute = require('./sizeRoute')


module.exports = (app, upload) => {
  sizeRoute(app, upload)
  categoryRoute(app, upload)
  productRoute(app, upload)
};
