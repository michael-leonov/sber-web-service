const { Card } = require("../models/models");
const ApiError = require("../error/ApiError");

const create = async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;

    if (title.length > 100) {
      return next(ApiError.badRequest("Слишком длинный заголовок"));
    }

    const card = await Card.create({ title, description, userId });
    return res.json(card);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const getAll = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 10;

    let offset = page * limit - limit;

    const cards = await Card.findAll({
      limit: Number(limit),
      offset: Number(offset),
    });

    return res.json(cards);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

module.exports = { create, getAll };
