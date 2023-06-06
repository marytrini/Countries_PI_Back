const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountries = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const allCountries = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      allCountries.length
        ? res.status(200).json(allCountries)
        : res.status(404).send({ message: "Country was not found" });
    } else {
      const countryName = await Country.findAll({
        where: {
          name: { [Op.iLike]: name },
        },
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      countryName
        ? res.status(200).json(countryName)
        : res.status(404).send("Country was not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountriesById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findOne({
      where: {
        id: id.toUpperCase(),
      },
      include: [
        {
          model: Activity,
          attributes: ["id", "name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      ],
    });
    country
      ? res.status(200).json(country)
      : res.status(404).send({ message: "Must enter a valid ID" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountriesById,
};
