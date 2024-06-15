const fastify = require('fastify');
const { createProduct, readProducts, readProductById, updateProductById, deleteProducts, deleteProductById } = require('../controller/productsController')


module.exports = (app, upload) => {
  // Create
  app.post('/products', { preHandler: upload.single('img'), handler: createProduct});

  // Read
  app.get('/products', readProducts);
  app.get('/products/:id', readProductById);

  // Update
  app.put('/products/:id', updateProductById);
  
  // Delete
  app.delete('/products', deleteProducts);
  app.delete('/products/:id', deleteProductById);
};

