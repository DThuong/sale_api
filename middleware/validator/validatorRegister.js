const {check} = require("express-validator");
module.exports = [
    check("name").notEmpty().withMessage("Tên người dùng không được để trống")
    .isLength({min: 3}).withMessage("Tên người dùng phải chứa ít nhất 3 kí tự")

    ,check("email").notEmpty().withMessage("email không được để trống")
    .isEmail().withMessage("Email không hợp lệ")

    ,check("password").notEmpty().withMessage("Mật khẩu không được để trống")
    .isLength({min: 6, max: 30}).withMessage("Mật khẩu phải chứa ít nhất 6 kí tự và tối đa là 30 kí tự")

    ,check("confirm-password")
    .notEmpty().withMessage("Vui lòng xác nhận lại mật khẩu.")
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw Error("Mật khẩu không khớp");
        }
        else return true;
    })
]