'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      //define association here
      Order.belongsTo(models.User, {
        foreignKey : 'user_id'
      });

      Order.belongsTo(models.Voucher, {
        foreignKey : 'voucher_id'
      })
=======
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Order.belongsTo(models.Voucher, {
        foreignKey: 'voucher_id'
      });
>>>>>>> 0b13d04b12dd89615ba2a63be44acd5261c43f32

      Order.hasMany(models.OrderDetail, {
        foreignKey: 'order_id'
      })
    }
  }
  Order.init({
    // order_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    staff_name: DataTypes.STRING,
    shipping_address: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    voucher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};