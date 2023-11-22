const express = require("express");
const OrderRouter = express.Router();
const {Order} = require("../models/");
const validationOrder = require("../middleware/validator/validationOrder");
const {validationResult} = require("express-validator");

// Xem toàn bộ danh sách order của người dùng
OrderRouter.get("/", (req, res) => {
    Order.findAll()
    .then(or => {
        res.json({
            code: 0,
            message: 'Lấy danh sách order thành công',
            data: or
        });
    }).catch(err => {
        res.json({
            code: 1,
            message: 'Lỗi khi lấy danh sách',
        });
    })
    
});

// Thêm một order mới
OrderRouter.post("/", validationOrder, async (req, res) => {
    const result = validationResult(req);
    if(result.errors.length === 0){
        try {
            // Order.destroy({
            //     where: {},
            //     truncate: true
            // })
            let {name, quantity, price} = req.body;
            await Order.create({name, quantity, price})
            .then(or => {
                return res.json({
                    code: 0,
                    message: "Thêm order thành công",
                    data: or
                });
            })
            .catch(err => {
                return res.json({
                    code: 1,
                    message: "Thêm order thất bại" + err.message
                });
            });
        } catch (error) {
            return res.json({
                code: 1,
                message: error.message
            });
        }
    }
    else{
        let messages  = result.mapped();
        let msg = '';
        for(m in messages){
            msg = messages[m];
            break;
        }
        return res.json({
            code: 1,
            message: msg
        });
    }
});

// Lấy một order chi tiết theo id
OrderRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.json({
            code: 1,
            message: "Không tìm thấy order có id: " + id
        })
    }
    else{
        await Order.findOne({ where: {id} })
        .then((data) => {
            return res.json({
                code: 0,
                message:"Tìm thấy order có id: " + id,
                data: data 
            });
        }).catch((err) => {
            return res.json({
                code: 0,
                message: "Lỗi server: " + err.message,
            });
        });
    }
});

// Cập nhật order theo id
OrderRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, quantity, price} = req.body;
    await Order.findOne({where: {id}})
    .then(response => {
        if(!response){
            return res.json({
                code: 1,
                message: "Không tìm thấy order có id: " + id,
            });
        }
        else{
            response.name = name;
            response.quantity = quantity;
            response.price = price;

            response.save();

            return res.json({
                code: 0,
                message: "Cập nhật order thành công",
            });
        }
    }).catch((err) => {
        return res.json({
            code: 1,
            message: err.message
        });
    });
});

// Xóa order theo id
OrderRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Order.findOne({where: {id}})
    .then((or) => {
        or.destroy();
        return res.json({
            code: 0,
            message: "Xóa order thành công."
        });
    })
    .catch((err) => {
        return res.json({
            code: 1,
            message: err.message
        });
    });
});

module.exports = OrderRouter;