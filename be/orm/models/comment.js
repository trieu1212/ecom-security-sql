'use strict';
const { de } = require('faker/lib/locales');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasOne(models.Product)
      Comment.hasOne(models.User)
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};