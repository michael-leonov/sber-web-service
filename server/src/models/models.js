const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

const Card = sequelize.define("card", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.CHAR(100) },
  description: { type: DataTypes.TEXT },
});

User.hasMany(Card, {
  onDelete: "cascade",
  hooks: true,
});
Card.belongsTo(User);

module.exports = { User, Card };
