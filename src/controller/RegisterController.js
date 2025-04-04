const { where } = require("sequelize");
const db = require("../models");
const Admin = db.admins;
const User = db.users;
const crypto = require("crypto");
class RegisterController {
  async registerApp(req, res) {
    try {
      const { username, password } = req.body;
      const password_md5 = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      const isExist = await RegisterController.checkAccount(username);
      if (isExist) {
        return res.status(409).json({ message: "Tài khoản đã tồn tại!" });
      }
      const newUser = await User.create({ username, password: password_md5 });

      return res.json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  static async checkAccount(username) {
    try {
      const admin = await Admin.findOne({ where: { username} });
      if (admin) return true;

      const user = await User.findOne({ where: { username} });
      if (user) return true;

      return false;
    } catch (error) {
      console.error("Lỗi: ", error.message);
      return false;
    }
  }
}
module.exports = new RegisterController();
