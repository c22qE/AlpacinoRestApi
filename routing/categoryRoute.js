const fastify = require('fastify');
const { createCategory, readCategories, readCategoryById, updateCategoryById, deleteCategories, deleteCategoryById } = require('../controller/categoriesController')


module.exports = (app) => {
  // Create
  app.post('/categories', createCategory);

  // Read
  app.get('/categories', readCategories);
  app.get('/categories/:id', readCategoryById);

  // Update
  app.put('/categories/:id', updateCategoryById);
  
  // Delete
  app.delete('/categories', deleteCategories);
  app.delete('/categories/:id', deleteCategoryById);
};

