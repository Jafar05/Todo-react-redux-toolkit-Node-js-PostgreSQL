const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, unique: true, required: true },
    password: { type: DataTypes.STRING, required: true },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
