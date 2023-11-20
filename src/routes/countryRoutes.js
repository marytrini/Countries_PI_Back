const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountriesById,
} = require("../controllers/countryController");

router.get("/", getCountries);
router.get("/:id", getCountriesById);


module.exports = router;
