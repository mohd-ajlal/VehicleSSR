const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");

// INDEX - Show all vehicles
router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("index", { vehicles });
});

// NEW - Show form to create new vehicle
router.get("/new", (req, res) => {
  res.render("new");
});

// CREATE - Add new vehicle to DB
router.post("/", async (req, res) => {
  await Vehicle.create(req.body);
  res.redirect("/vehicles");
});

// SHOW - Show details of a single vehicle
router.get("/:id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("show", { vehicle });
});

// EDIT - Show edit form
router.get("/:id/edit", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("edit", { vehicle });
});

// UPDATE - Update vehicle details (except vehicleName)
router.put("/:id", async (req, res) => {
  const { vehicleName, ...updatedData } = req.body;
  await Vehicle.findByIdAndUpdate(req.params.id, updatedData);
  res.redirect(`/vehicles/${req.params.id}`);
});

// DELETE - Remove vehicle
router.delete("/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect("/vehicles");
});

module.exports = router;
