const express = require("express");
const route = express.Router();
const CategoriesController = require("../controller/CategoriesController");
route.get("/",CategoriesController.getAll);
route.post("/",CategoriesController.createCategory);
route.put("/:category_id",CategoriesController.updateCategory);
route.delete("/:category_id",CategoriesController.deleteCategory);
module.exports = route;