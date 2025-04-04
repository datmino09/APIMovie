const { where, Op } = require("sequelize");
const db = require("../models");
const Movie = db.movies;
const Episodes = db.episodes;
class MovieController {
  async getAll(req, res) {
    try {
      let { page, limit } = req.query;
  
      page = parseInt(page) || 1; 
      limit = parseInt(limit) || 10; 
  
      const offset = (page - 1) * limit; 
  
      const { count, rows } = await Movie.findAndCountAll({
        include: {
          model: db.categories,
          as: "category",
          attributes: ["name"],
        },
        order: [['movie_id', 'DESC']],
        limit,
        offset,
      });
  
      res.json({
        totalItems: count, 
        totalPages: Math.ceil(count / limit), 
        currentPage: page,
        movies: rows, 
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  
  async getByCatagories(req, res) {
    try {
      const category_id = req.params.category_id;
      let { page, limit } = req.query;
  
      page = parseInt(page) || 1; 
      limit = parseInt(limit) || 10; 
  
      const offset = (page - 1) * limit; 
      if (!category_id)
        return res.status(404).json({ message: "Không tìm thấy" });
      const {count,rows} = await Movie.findAndCountAll({
        where: {
          category_id: category_id,
        },
        include: {
          model: db.categories,
          as: "category",
          attributes: ["name"],
        },
        limit,
        offset,
      });
      res.json({
        totalItems: count, 
        totalPages: Math.ceil(count / limit), 
        currentPage: page,
        movies: rows,
    });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async searchMovie(req, res) {
    try {
      const keyword = req.query.keyword;
      let { page, limit } = req.query;
      page = parseInt(page) || 1; 
      limit = parseInt(limit) || 10; 
      const offset = (page - 1) * limit; 
      if (!keyword) return res.status(404).json({ message: "Không tìm thấy" });
      const {count,rows} = await Movie.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
        include: {
          model: db.categories,
          as: "category",
          attributes: ["name"],
        },
        limit,
        offset,
      });
      if (count === 0)
        return res.status(404).json({ message: "Không tìm thấy" });
      res.json({
        totalItems: count, 
        totalPages: Math.ceil(count / limit), 
        currentPage: page,
        movies: rows,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async createMovie(req, res) {
    try {
      const {
        title,
        description,
        image,
        poster,
        year,
        category_id,
        is_series,
      } = req.body;
      const movie = await Movie.create({
        title,
        description,
        image,
        poster,
        year,
        category_id,
        is_series,
      });
      if (movie) {
        return res
          .status(201)
          .json({ data: movie, message: "Thêm thành công" });
      }
      res.json({ message: "Thêm thất bại" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }

  async updateMovie(req, res) {
    try {
      const { movie_id } = req.params;
      const movie = await Movie.findOne({
        where: {
          movie_id,
        },
      });
      if (!movie)
        return res.status(404).json({ message: "Phim không tồn tại" });
      const {
        title,
        description,
        image,
        poster,
        year,
        category_id,
        is_series,
      } = req.body;
      await Movie.update(
        {
          title,
          description,
          image,
          poster,
          year,
          category_id,
          is_series,
        },
        {
          where: {
            movie_id,
          },
        }
      );
      res.json({ message: "Update thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async deleteMovie(req, res) {
    try {
      const { movie_id } = req.params;
      const movie = await Movie.findOne({
        where: {
          movie_id,
        },
      });
      if (!movie)
        return res.status(404).json({ message: "Phim không tồn tại" });
      await Episodes.destroy({ where: { movie_id } });
      await Movie.destroy({ where: { movie_id } });
      res.json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
}

module.exports = new MovieController();
