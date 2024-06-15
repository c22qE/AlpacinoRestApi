const fastify = require('fastify');
const { createSize, readSizes, readSizeById, updateSizeById, deleteSizes, deleteSizeById } = require('../controller/sizesController')


module.exports = (app) => {
  // Create
  app.post('/sizes', createSize);

  // Read
  app.get('/sizes', readSizes);
  app.get('/sizes/:id', readSizeById);

  // Update
  app.put('/sizes/:id', updateSizeById);
  
  // Delete
  app.delete('/sizes', deleteSizes);
  app.delete('/sizes/:id', deleteSizeById);
};

