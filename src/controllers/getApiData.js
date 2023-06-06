const { Country, Activity } = require("../db");
const axios = require("axios");

const getApiData = async (req, res) => {
  try {
    let getData = await axios.get("https://restcountries.com/v3/all");
    getData = await getData.data.map(async (country) => {
      return await Country.findOrCreate({
        where: {
          id: country.cca3,
          name: country.name.common,
        },
        defaults: {
          flag: country.flags[1],
          continent: country.continents[0],
          capital: country.capital
            ? country.capital[0]
            : "There is no capital located within this country.",
          subregion: country.subregion
            ? country.subregion
            : "Subregion isn't defined for this country.",
          area: country.area,
          population: country.population,
        },
      });
    });
    const apiData = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
    return apiData;
  } catch (error) {
    console.error("Error saving countries to DB");
  }
};
module.exports = getApiData;
