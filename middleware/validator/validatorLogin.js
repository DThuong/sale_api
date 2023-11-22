const {check} = require("express-validator");

module.exports = [
    check("email").notEmpty().withMessage("Email không được để trống.")
    .isEmail().withMessage("Email không hợp lệ."),

    check("password").notEmpty().withMessage("Password không được để trống.")
    .isLength({min: 6, max: 30}).withMessage("Password phải chứa ít nhất 6 kí tự và tối đa là 30 kí tự.")
]