const express = require("express");
// config dotenv
require('dotenv').config();
const AccountRouter = require("./routers/AccountRouter");
const OrderRouter = require("./routers/OrderRouter");
const ProductRouter = require("./routers/ProductRouter");
const mysql = require("mysql2");
const { sequelize } = require('./models/');
const app = express();
// env
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        code: 1,
        message: "welcome to my rest api"
    });
});

app.use("/api/account", AccountRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/products", ProductRouter);

// sequelize.sync({alter: true});

app.listen(PORT, async () => {
    console.log("server running on port: ", PORT);
    try {
      await sequelize.authenticate();
      console.log('Kết nối thành công tới cơ sở dữ liệu mysql.');
    } catch (error) {
      console.error('Lỗi kết nối cơ sở dữ liệu: ', error);
    }
})
