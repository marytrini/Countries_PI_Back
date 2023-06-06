const express = require("express");
const router = express.Router();
const {
  createActivity,
  getActivity,
  deleteActivity,
  modifyActivity,
} = require("../controllers/activityController");

router.post("/", createActivity);
router.get("/", getActivity);
router.delete("/:id", deleteActivity);
router.put("/", modifyActivity);

module.exports = router;
