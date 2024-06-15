const { NotFound, BadRequest, Internal } = require('../middleware/ApiError');
const { where } = require('sequelize');
const { Size, SizeProduct, Product } = require('../models/models');
const { describe } = require('pm2');

// Create
const createSize = async (req, reply) => {
    const {name} = req.body;

    const size = await Size.create({
        name,
    })

    if (!size)
        return BadRequest('Некорректные данные в запросе')

    reply.code(201).send(size);
};

// Read
const readSizes = async (req, reply) => {
    const sizes = await Size.findAll();

    if (!sizes)
        return Internal('Внутренняя ошибка сервера');

    reply.code(200).send(sizes)
};

const readSizeById = async (req, reply) => {
    const size = await Size.findByPk(req.params.id)

    if (!size) {
        return NotFound('Запрашиваемая опция продукта не найдена');
    }
    reply.code(200).send(size);
};

// Update
const updateSizeById = async (req, reply) => {
    const size = await Size.findByPk(req.params.id)

    if (!size) {
        return NotFound('Запрашиваемая опция продукта на обновление данных не найдена')
    }
    const updatedSize = await Size.update(req.body, {
        where: { id: req.params.id }
    })

    reply.code(200).send('Обновлено');
};

// Delete
const deleteSizes = async (req, reply) => {
    const size = await Size.destroy({where: {}});
    reply.send(200)
};

const deleteSizeById = async (req, reply) => {
    const size = await Size.destroy({where: {id: req.params.id}});
    reply.send(200)
};


module.exports = {
    createSize, 
    readSizes, 
    readSizeById, 
    updateSizeById, 
    deleteSizes, 
    deleteSizeById 
}
