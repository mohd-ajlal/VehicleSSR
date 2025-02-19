const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("index", { vehicles });
});

router.get("/new", (req, res) => {
  res.render("new");
});


router.post("/", async (req, res) => {
  await Vehicle.create(req.body);
  res.redirect("/vehicles");
});


router.get("/:id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("show", { vehicle });
});


router.get("/:id/edit", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("edit", { vehicle });
});


router.put("/:id", async (req, res) => {
  const { vehicleName, ...updatedData } = req.body;
  await Vehicle.findByIdAndUpdate(req.params.id, updatedData);
  res.redirect(`/vehicles/${req.params.id}`);
});


router.delete("/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect("/vehicles");
});

module.exports = router;
