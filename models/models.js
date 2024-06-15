const { DataTypes } = require("sequelize")
const { sequelize } = require("../db")


const Admin = sequelize.define('admin', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING(15), allowNull: false},
  password: {type: DataTypes.STRING(64), allowNull: false}, // bcrypted
  // role
}, {
  timestamps: false
})

const Role = sequelize.define('role', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  role: {type: DataTypes.STRING(10), allowNull: false},
  // adminId
}, {
  timestamps: false
})



const Preference = sequelize.define('preference', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true}, // только одна запись в таблице с id = 1
  delivery_price: {type: DataTypes.INTEGER, allowNull: false, unique: true}, // only update this value not create new if value is define
  max_amount_products: {type: DataTypes.INTEGER, allowNull: false, unique: true}, // only update this value not create new if value is define
}, {
  timestamps: false
})


const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING(40), allowNull: false},
  description: {type: DataTypes.STRING(255), allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  img: {type: DataTypes.STRING(150), allowNull: false},
  // categoryId
  // size 10cm, 20cm, 30cm. 40cm,. 1л, 3л, 4л
  // amount_orders
}, {
  timestamps: false
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING(40), defaultValue: "Пицца", allowNull: false},
  // product
}, {
  timestamps: false
})

const Size = sequelize.define('size', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING(10), allowNull: false},
}, {
  timestamps: false
})

// popularity a product 1 in android app
const AmountOrder = sequelize.define('amount_order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  amout: {type: DataTypes.INTEGER, allowNull: false},
  // productId
}, {
  timestamps: false
})

const SizeProduct = sequelize.define('size_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  // product id
  // size
}, {
  timestamps: false
})

// status (уведомление в приложении)
// - (0) В ожидании
// - (1) Заказ принят
// - (2) Заказ готов, ожидает доставки/когда клиент заберет.
// - (3) Заказ Доставлен/Забрал клиент 
const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  client_fullname: {type: DataTypes.STRING(60), allowNull: false},
  phone: {type: DataTypes.STRING(11), allowNull: false},
  address: {type: DataTypes.STRING(150), allowNull: false},
  is_delivery: {type: DataTypes.BOOLEAN, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  status: {type: DataTypes.INTEGER, allowNull: false}    
  // timeId
  // payment
  // order_cart
}, {
  timestamps: true
})

const Time = sequelize.define('time', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  time: {type: DataTypes.TIME, allowNull: false, unique: true},
}, {
  timestamps: false
})

// is_pay
// - (false) оплачено
// - (true) Ожидает оплаты при получении заказа
const Payment = sequelize.define('payment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cart_number: {type: DataTypes.STRING(11), allowNull: false},
  transfer_amount: {type: DataTypes.INTEGER, allowNull: false},
  is_pay: {type: DataTypes.BOOLEAN, allowNull: false}
  // orderId
}, {
  timestamps: true
})

// Заказанные продукты
const OrderProduct = sequelize.define('order_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  // productId
  // orderId
}, {
  timestamps: false
})

// Информация продуктах
const OrderProductinfo = sequelize.define('order_product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  product_amount: {type: DataTypes.INTEGER, allowNull: false},
  // orderProductId
  // sizeid
}, {
  timestamps: false
})


// one-to-one => hasOne, belongsTo
// hasOne not add? new fields
// belongsTo say have userId (foregin_key)
Admin.hasOne(Role, {  // Admin have association-link to role
  foreignKey: {
    allowNull: false
  }
})   
Role.belongsTo(Admin) // Role have association-link to admin [adminId] (for get admin users, from role.findAll('admins'))

// one-to-many
Category.hasMany(Product, { // Category have association-link to product
  foreignKey: {
    allowNull: false,
  }
})    
Product.belongsTo(Category) // Product have association-link to admin [categoryId]

// one-to-one
Product.hasOne(AmountOrder, {
  foreignKey: {
    allowNull: false
  }
}) 
AmountOrder.belongsTo(Product)

// many-to-many
Product.belongsToMany(Size, {
  through: SizeProduct,
  foreignKey: {
    name: "productId",
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
Size.belongsToMany(Product, {
  through: SizeProduct,
  foreignKey: {
    name: "sizeId",
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

// one-to-many
Time.hasMany(Order, {
  foreignKey: {
    allowNull: false
  }
})
Order.belongsTo(Time)

// one-to-one
Order.hasOne(Payment, {
  foreignKey: {
    allowNull: false
  }
})
Payment.belongsTo(Order)

// many-to-many
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: {
    allowNull: false
  }
})
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: {
    allowNull: false
  }
})

// one-to-one
OrderProduct.hasOne(OrderProductinfo, {
  foreignKey: {
    allowNull: false
  }
})
OrderProductinfo.belongsTo(OrderProduct)

// one-to-many
Size.hasMany(OrderProductinfo, {
  foreignKey: {
    allowNull: false
  }
})
OrderProductinfo.belongsTo(Size)

module.exports = {
    Admin,
    Role, 
    Preference,
    Product,
    Category, 
    Size, 
    AmountOrder,
    SizeProduct,
    Order,
    Time,
    Payment,
    OrderProduct,
    OrderProductinfo
}