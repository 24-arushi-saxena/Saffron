const MenuItem = require("../models/MenuItem");

// GET /api/menu
// Get all dishes in the database
const getAllDishes = async (req, res) => {
  try {
    const dishes = await MenuItem.find({});
    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch dishes.",
      error: error.message,
    });
  }
};

// GET /api/menu/featured
// Get only isFeatured true dishes
const getFeaturedDishes = async (req, res) => {
  try {
    const dishes = await MenuItem.find({ isFeatured: true });
    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch featured dishes.",
      error: error.message,
    });
  }
};

// GET /api/menu/category/:categoryName
// Get dishes filtered by category
const getDishesByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const dishes = await MenuItem.find({ category: categoryName });
    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error: Could not fetch dishes for category: ${categoryName}`,
      error: error.message,
    });
  }
};

module.exports = {
  getAllDishes,
  getFeaturedDishes,
  getDishesByCategory,
};
