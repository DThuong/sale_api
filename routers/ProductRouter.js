const express = require("express");
const ProductRouter = express.Router();
const validationProduct = require("../middleware/validator/validationProduct");
const { validationResult } = require("express-validator");
const {Product} = require("../models");
const authorize = require("../middleware/auth/authorize");

ProductRouter.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json({
        code: 0,
        message: "Danh sách toàn bộ sản phẩm",
        products: products,
      });
    })
    .catch(function (err) {
      res.json({
        code: 1,
        message: "Lỗi khi lấy danh sách sản phẩm" + err.message,
      });
    });
});

ProductRouter.post("/", validationProduct, authorize(["ADMIN"]), (req, res) => {
  const result = validationResult(req);

  if (result.errors.length === 0) {
    const { name, price, desc } = req.body;
    
    Product.create({ name, price, desc })
      .then(() => {
        res.json({ code: 0, message: "Thêm sản phẩm thành công" });
      })
      .catch((err) => {
        res.json({
          code: 1,
          message: "Lỗi khi thêm sản phẩm: " + err.message,
        });
      });
  } else {
    let messages = result.mapped();
    let msg = "";
    for (m in messages) {
      msg = messages[m];
      break;
    }
    return res.json({ code: 1, message: msg });
  }
});

ProductRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      code: 1,
      message: "Không tìm thấy sản phẩm có id: " + id,
    });
  }

  Product.findByPk(id)
    .then((p) => {
      if (!p) {
        return res.json({
          code: 1,
          message: "Không tìm thấy sản phẩm có id: " + id,
        });
      } else
        return res.json({
          code: 0,
          message: "Đã tìm thấy sản phẩm.",
          product: p,
        });
    })
    .catch((err) => {
      if (err.message.includes("Cast to ObjectId failed for value")) {
        return res.json({
          code: 0,
          message: "Id sản phẩm không hợp lệ",
        });
      }
      return res.json({
        code: 0,
        message: "Lỗi khi tìm kiếm sản phẩm: " + err.message,
      });
    });
});

ProductRouter.put("/:id", authorize(["ADMIN"]), (req, res) => {
  const { id } = req.params;
  const { name, price, desc } = req.body;

  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        return res.json({
          code: 1,
          message: "Không tìm thấy sản phẩm có id: " + id,
        });
      }

      // Cập nhật sản phẩm
      product.name = name;
      product.price = price;
      product.desc = desc;

      return product.save();
    })
    .then(() => {
      res.json({ code: 0, message: "Cập nhật sản phẩm thành công" });
    })
    .catch((err) => {
      res.json({
        code: 1,
        message: "Lỗi khi cập nhật sản phẩm: " + err.message,
      });
    });
});

ProductRouter.delete("/:id", authorize(["ADMIN"]), (req, res) => {
  const { id } = req.params;

  Product.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 0) {
        return res.json({
          code: 1,
          message: "Không tìm thấy sản phẩm cần xóa",
        });
      } else {
        return res.json({
          code: 0,
          message: "Đã xóa thành công sản phẩm.",
        });
      }
    })
    .catch((err) => {
      return res.json({
        code: 1,
        message: "Lỗi Không thể xóa sản phẩm: " + err.message,
      });
    });
});

module.exports = ProductRouter;
