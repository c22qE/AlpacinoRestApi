const { Product, SizeProduct } = require('../models/models');
const { NotFound, BadRequest, Internal } = require('../middleware/ApiError');
const { where } = require('sequelize');
const { Category } = require('../models/models');
const { describe, list } = require('pm2');

// Create
const createProduct = async (req, reply) => {
    // Получить имя файла и положить в product.create
    const fileName = req.file.filename
    if (!req.file) {
        return BadRequest('Отсутствует изображение в запросе')
    } 

    // Получить данные продукта
    const {name, description, price, category, sizes} = req.body;

    // Получить id категории
    const {id} = await Category.findOne({where: {name: category}})
    
    if (!id) {
        return NotFound('Указанная категория продукта не найдена')
    }

    // Создать продукта запись в БД
    const product = await Product.create({
        name,
        description,
        price,
        img: fileName,
        categoryId: id,
    })

    // Сохраним id созданного продукта
    const productId = product.dataValues.id

    // Если указаны размеры продукта, то создадим на них запись в SizeProduct
    if (sizes != []) {
        // Сделаем строку 1,2,3,4 в массив
        const sizesArray = sizes.split(',')

        // ? Узнать как создавать записи в таблице many-to-many в orm squalize
        // ? Узнать как во nuxtjsvuejs Провести s формы, перед отправкой на сервер
        
        // Перебрать размер_id , и создавать запись в БД
        // Создать запись размеров продукта (20см, 30см, 45см...)
        await sizesArray.map(sizeId => {
            sizeProduct = SizeProduct.create({
                productId: productId,
                sizeId: sizeId
            })

            if (!sizeProduct) {
                return BadRequest('Некорректные данные в запросе')
            }
        })
    }

    if (!product) {
        return BadRequest('Некорректные данные в запросе')
    }
    reply.code(201).send(product);
};

// Read
const readProducts = async (req, reply) => {
    const products = await Product.findAll();
    const categories = await Category.findAll();
    const productSizes = await SizeProduct.findAll();


    if (!products) {
        return Internal('Внутренняя ошибка сервера');
    }

    reply.code(200).send({products, categories, product_sizes: productSizes})
};

const readProductById = async (req, reply) => {
    const product = await Product.findByPk(req.params.id)
    // const category = await Product.category

    if (!product) {
        return NotFound('Запрашиваемый продукт не найден');
    }
    reply.code(200).send(product);
};

// Update
const updateProductById = async (req, reply) => {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
        return NotFound('Запрашиваемый продукт на обновление данных не найден')
    }
    const updatedProduct = await Product.update(req.body, {
        where: { id: req.params.id }
    })

    reply.code(200).send('Обновлено');
};

// Delete
const deleteProducts = async (req, reply) => {
    const products = await Product.destroy({where: {}});
    reply.send(200)
};

const deleteProductById = async (req, reply) => {
    const product = await Product.destroy({where: {id: req.params.id}});
    reply.send(200)
};




module.exports = {
    createProduct,
    readProducts,
    readProductById,
    updateProductById,
    deleteProducts,
    deleteProductById,
}