const { where } = require("sequelize");
const db = require("../models");
const Episodes = db.episodes;
class EpisodesController {
  async getByMovieId(req, res) {
    try {
      const { movie_id } = req.params;

      if (!movie_id) {
        return res.status(400).json({ message: "movie_id không hợp lệ" });
      }

      const episodes = await Episodes.findAll({
        where: { movie_id: movie_id },
      });

      if (episodes.length === 0) {
        return res
          .status(404)
          .json({ message: "Không có tập nào cho phim này" });
      }

      res.json(episodes);
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async createEpisodes(req, res) {
    try {
      const { name, video_url, movie_id } = req.body;
      const episodes = await Episodes.create({
        name,
        video_url,
        movie_id,
      });
      if (episodes) {
        return res.json({ data: episodes, message: "Thêm thành công" });
      }
      res.json({ message: "Thêm thất bại" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async updateEpisodes(req, res) {
    try {
      const { id } = req.params;
      const episodes = await Episodes.findOne({
        where: {
          id,
        },
      });
      if (!episodes)
        return res.status(404).json({ message: "Tập phim không tồn tại" });
      const { name, video_url } = req.body;
      await Episodes.update(
        {
          name,
          video_url,
        },
        {
          where: {
            id,
          },
        }
      );
      res.json({ message: "Update thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async deleteEpisodes(req, res) {
      try {
        const { id } = req.params;
        const episodes = await Episodes.findOne({
          where: {
            id,
          },
        });
        if (!episodes)
          return res.status(404).json({ message: "Tập phim không tồn tại" });
        await Episodes.destroy({ where: { id } });
        res.json({ message: "Xóa thành công" });
      } catch (error) {
        res.status(500).json({ message: "Lỗi: " + error.message });
      }
    }
}

module.exports = new EpisodesController();
