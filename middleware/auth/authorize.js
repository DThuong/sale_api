const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = (allowedTypes) => (req, res, next) => {
  const token = req.header("token");

  try {
    // Kiểm tra xem có token hay không
    if (!token) {
      return res.status(401).send("Không tìm thấy token.");
    }

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Lưu thông tin user vào req để sử dụng trong các middleware và routes sau này
    req.user = decoded;

    // Kiểm tra quyền truy cập
    if (req.user && allowedTypes.includes(req.user.type)) {
      return next();
    } else {
      return res.status(403).send("Bạn không có quyền truy cập.");
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Token không hợp lệ.");
    } else {
      console.error("Lỗi xác thực token:", error);
      return res.status(500).send("Lỗi server.");
    }
  }
};

module.exports = authorize;
