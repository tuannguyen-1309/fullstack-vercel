import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkPermission = async (req, res, next) => {
  try {
    // b1 kiểm tra có token gửi lên hay không
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      //nếu người dùng không gửi token lên
      return res.status(401).json({
        message: "Không có quyền",
      });
    }

    // b2 kiểm tra token có hợp lệ hay không: jwt.verify(token,'secretKey)
    const data = jwt.verify(token, "wd19202");
    if (!data) {
      //nếu verify token lỗi
      return res.status(401).json({
        message: "Không có quyền",
      });
    }

    //b3: kiểm tra data trong token có tồn tại ở trong db hay không?
    // nếu tạo token bằng email thì dùng findOne
    const user = await User.findById(data.id);

    if (!user) {
      // nếu không có user tương ứng với id
      return res.status(401).json({
        message: "Không có quyền",
      });
    }
    next(); //chạy tiếp sang controller
  } catch (error) {
    res.status(401).json({
      message: "Lỗi",
    });
  }
};

export { checkPermission };
