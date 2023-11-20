const { Country, Activity } = require("../db");
const axios = require("axios");

const getApiData = async (req, res) => {
  try {
    const apiData = await axios.get("https://restcountries.com/v3/all");

    const countries = apiData.data.map((country) => ({
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      continent: country.continents[0],
      capital: country.capital ? country.capital[0] : "There is no capital located within this country.",
      subregion: country.subregion || "Subregion isn't defined for this country.",
      area: country.area,
      population: country.population,
    }));

    // Fetch existing country IDs from the database
    const existingCountryIds = (await Country.findAll({ attributes: ["id"] })).map((country) => country.id);

    // Filter countries to only include new ones
    const newCountries = countries.filter((country) => !existingCountryIds.includes(country.id));

    // Perform bulk insert of new countries
    await Country.bulkCreate(newCountries);

    const apiDataWithActivities = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });

    return apiDataWithActivities;
  } catch (error) {
    console.error("Error saving countries to DB:", error);
  }
};

module.exports = getApiData;
