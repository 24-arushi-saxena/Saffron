const express = require("express");
const router = express.Router();
const {
  getAllDishes,
  getFeaturedDishes,
  getDishesByCategory,
} = require("../controllers/menuController");

// GET /api/menu - Get all dishes
router.get("/", getAllDishes);

// GET /api/menu/featured - Get only featured dishes
router.get("/featured", getFeaturedDishes);

// GET /api/menu/category/:categoryName - Get dishes by category
router.get("/category/:categoryName", getDishesByCategory);

module.exports = router;
