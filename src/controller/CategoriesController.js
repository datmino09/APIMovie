const db = require("../models"); 
const Categories = db.categories; 

class CategoriesController {
  async getAll(req, res) {
    try {
      const categories = await Categories.findAll(); 
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await Categories.create({
        name,
      });
      if (category) {
        return res.json({ data: category, message: "Thêm thành công" });
      }
      res.json({ message: "Thêm thất bại" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async updateCategory(req, res) {
      try {
        const { category_id } = req.params;
        const category = await Categories.findOne({
          where: {
            category_id,
          },
        });
        if (!category)
          return res.status(404).json({ message: "Thể loại không tồn tại" });
        const { name } = req.body;
        await Categories.update(
          {
            name,
          },
          {
            where: {
              category_id,
            },
          }
        );
        res.json({ message: "Update thành công" });
      } catch (error) {
        res.status(500).json({ message: "Lỗi: " + error.message });
      }
    }
    async deleteCategory(req, res) {
      try {
        const { category_id } = req.params;
        const category = await Categories.findOne({
          where: {
            category_id,
          },
        });
        if (!category)
          return res.status(404).json({ message: "Thể loại không tồn tại" });
        await Categories.destroy({ where: { category_id } });
        res.json({ message: "Xóa thành công" });
      } catch (error) {
        res.status(500).json({ message: "Lỗi: " + error.message });
      }
    }
}

module.exports = new CategoriesController();
