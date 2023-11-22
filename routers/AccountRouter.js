const express = require("express");
const AccountRouter = express.Router();
const { validationResult } = require("express-validator");
const validateResgister = require("../middleware/validator/validatorRegister");
const validateLogin = require("../middleware/validator/validatorLogin");
const bcrypt = require("bcrypt");
const {User} = require("../models");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/auth/authorize");
require("dotenv").config();

AccountRouter.get("/", (req, res) => {
  return res.json({
    code: 0,
    message: "Xử lý tài khoản",
  });
});

AccountRouter.get("/register", (req, res) => {
  return res.json({
    code: 1,
    message: "Đăng ký tài khoản",
  });
});

AccountRouter.post("/register", validateResgister, async (req, res) => {
  const result = validationResult(req);

  if (result.errors.length === 0) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Kiểm tra tài khoản đã tồn tại chưa
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error("Tài khoản này đã tồn tại");
      }

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.json({
        code: 0,
        message: "Đăng ký tài khoản thành công!!",
        data: newUser,
      });
    } catch (err) {
      return res.json({
        code: 1,
        message: "Đăng ký tài khoản thất bại!! " + err.message,
      });
    }
  } else {
    let messages = result.mapped();
    let msg = Object.values(messages)[0].msg;
    return res.json({
      code: 1,
      error: msg,
    });
  }
});

AccountRouter.get("/login", (req, res) => {
  return res.json({
    code: 0,
    message: "Đăng nhập tài khoản",
  });
});

AccountRouter.post("/login", validateLogin, async (req, res) => {
  const result = validationResult(req);

  if (result.errors.length === 0) {
    try {
      const { email, password } = req.body;

      // Sử dụng async/await để giảm nested callback
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.json({ code: 1, message: "Email không tồn tại" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.json({
          code: 1,
          message: "Đăng nhập thất bại, mật khẩu không chính xác !!",
        });
      }

      const tk = process.env.JWT_TOKEN;
      jwt.sign(
        {
          email: user.email,
          type: user.type
        },
        tk,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          return res.json({
            code: 0,
            message: "Đăng nhập thành công",
            token: token,
          });
        }
      );
    } catch (err) {
      return res.json({
        code: 1,
        message: "Đăng nhập thất bại. " + err.message,
      });
    }
  } else {
    let messages = result.mapped();
    let msg = Object.values(messages)[0].msg;
    return res.json({
      code: 1,
      error: msg,
    });
  }
});

const createAdminUser = async () => {
  try {
    const password = "123456";
    const hashedPassword = bcrypt.hashSync(password, 10);
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword, 
      type: 'ADMIN',
    });

    console.log('User admin đã được tạo:', adminUser);
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error);
  }
};
// createAdminUser();


AccountRouter.delete('/:userId', authorize(['ADMIN']), async (req, res) => {
  try {
    const userId = req.params.userId;

    const userToDelete = await User.findByPk(userId);

    // ADMIN là người thực hiện xóa người dùng
    if (req.user && req.user.type === 'ADMIN') {
      // ADMIN không thể tự xóa chính mình
      if (userToDelete && userToDelete.type !== 'ADMIN') {
        // Thực hiện xóa user
        await User.destroy({
          where: {
            id: userId,
          },
        });

        return res.status(200).send('Xóa thành công user có id: ' + userId);
      } else {
        return res.status(403).send('ADMIN không thể bị xóa khỏi database.');
      }
    } else {
      return res.status(403).send('Bạn không có quyền truy cập.');
    }
  } catch (error) {
    console.error('Lỗi xóa người dùng:', error);
    return res.status(500).send('Lỗi server');
  }
});


module.exports = AccountRouter;
