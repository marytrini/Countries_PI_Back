const { Country, Activity } = require("../db");

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    const countryList = await Country.findAll({
      where: {
        name: countries,
      },
    });
    await Promise.all(
      countryList.map((country) => country.addActivity(newActivity))
    );
    res.status(200).send("Activity created succesfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const getIt = await Activity.findAll();

    res.status(200).json(getIt);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAct = await Activity.findByPk(id);

    if (deletedAct) {
      await deletedAct.destroy();
      const remainActs = await Activity.findAll();

      res.status(200).json(remainActs);
    } else {
      res.status(200).json("This activity does not exist");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifyActivity = async (req, res) => {
  try {
    const { id, name, difficulty, duration, season, countries } = req.body;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({
        error: "Activity not found",
      });
    }
    activity.name = name;
    activity.difficulty = difficulty;
    activity.duration = duration;
    activity.season = season;
    await activity.save();

    const country = await Country.findAll({
      where: {
        name: countries,
      },
    });
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    await activity.setCountries(country);

    res.status(200).json({
      message: "Activity updated successfully",
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createActivity,
  getActivity,
  deleteActivity,
  modifyActivity,
};
