const { where } = require("sequelize");
const db = require("../models");
const Admin = db.admins;
const User = db.users;
const crypto = require("crypto");
class LoginController {
  async loginApp(req, res) {
    try {
      const { username, password } = req.body;
      const password_md5 = crypto.createHash("md5").update(password).digest("hex");
      const admin = await Admin.findOne({
        where: {
          username,
          password:password_md5,
        },
      });
      if (admin)
        return res.json({ role: "admin",data:admin, success:true });
      const user = await User.findOne({
        where: {
          username,
          password:password_md5,
        },
      });
      if (user)
        return res.json({ role: "user", data:user , success:true });
      return res.json({ success:false });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
}
module.exports = new LoginController();
