const {check} = require("express-validator");

module.exports = [
    check("name").notEmpty().withMessage("Vui lòng nhập tên")
    .exists().withMessage("Tên order không được trùng"),
    check("quantity").notEmpty().withMessage("Vui lòng nhập số lượng"),
    check("price").notEmpty().withMessage("Vui lòng nhập giá").isNumeric().withMessage("Giá sản phẩm không được chứa kí tự")
]