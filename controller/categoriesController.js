const { NotFound, BadRequest, Internal } = require('../middleware/ApiError');
const { where } = require('sequelize');
const { Category } = require('../models/models');
const { describe } = require('pm2');

// Create
const createCategory = async (req, reply) => {
    const {name} = req.body;

    const category = await Category.create({
        name,
    })

    if (!category)
        return BadRequest('Некорректные данные в запросе')

    reply.code(201).send(category);
};

// Read
const readCategories = async (req, reply) => {
    const categories = await Category.findAll();

    // отсиртировать id по возрастанию


    if (!categories)
        return Internal('Внутренняя ошибка сервера');

    reply.code(200).send(categories)
};

const readCategoryById = async (req, reply) => {
    const category = await Category.findByPk(req.params.id)

    if (!category) {
        return NotFound('Запрашиваемая категория не найдена');
    }
    reply.code(200).send(category);
};

// Update
const updateCategoryById = async (req, reply) => {
    const category = await Category.findByPk(req.params.id)

    if (!category) {
        return NotFound('Запрашиваемая категория на обновление данных не найдена')
    }
    const updatedCategory = await Category.update(
        {name: req.body.name },
        {
            where: { id: req.params.id }
        }
    )
    if (!updatedCategory)
        return BadRequest('Некорректные данные в запросе')

    reply.code(200).send("Обновлено");
};

// Delete
const deleteCategories = async (req, reply) => {
    const category = await Category.destroy({where: {}});
    reply.send(200)
};

const deleteCategoryById = async (req, reply) => {
    const category = await Category.destroy({where: {id: req.params.id}});
    reply.send(200)
};




module.exports = {
    createCategory,
    readCategories, 
    readCategoryById, 
    updateCategoryById, 
    deleteCategories, 
    deleteCategoryById 
}
