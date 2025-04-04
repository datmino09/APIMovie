const { where } = require("sequelize");
const db = require("../models");
const Comment = db.comments;
class CommentController{
    async getByMovieId(req,res){
        try{
            const {movie_id} = req.params;
            const {count, rows} = await Comment.findAndCountAll({
                include: [{
                model: db.users,
                as: "user",
                attributes: ['username'], 
            }]
                ,
                where:{
                    movie_id
                }
            });
            res.status(200).json({
                totalItems: count,
                comments: rows
            })
        }catch(error){
            res.status(500).json({messeage:"Lỗi: "+ error});
        }
    }
    async addComment(req,res){
        try {
            const {user_id,movie_id,content} = req.body;
            await Comment.create({
                user_id,movie_id, content
            });
            res.status(201).json({messeage:"Thêm thành công"})
        } catch (error) {
            res.status(500).json({messeage:"Lỗi: "+ error});
        }
    }
    async deleteComment(req, res){
        try {
            const {comment_id} = req.params;
            const comment = await Comment.findOne({
                where:{comment_id}
            });
            if(!comment){
                return res.status(400).json({messeage: "Không tìm thấy "});
            }
            await Comment.destroy({where:{ comment_id}});
            res.status(200).json({messeage: "Xóa thành công"});
        } catch (error) {
            res.status(500).json({messeage:"Lỗi: "+ error});
        }
    }
}
module.exports = new CommentController();