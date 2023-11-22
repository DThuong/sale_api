const {check} = require("express-validator");

module.exports = [
    check("name").notEmpty().withMessage("Tên sản phẩm không được để trống"),

    check("price").notEmpty().withMessage("Giá sản phẩm không được để trống")
    .isNumeric().withMessage("Giá sản phẩm không được chứa kí tự"),

    check("desc").notEmpty().withMessage("Mô tả sản phẩm không được để trống"),
]
