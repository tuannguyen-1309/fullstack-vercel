import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authValidator } from "../validations/auth.js";
class AuthController {
  async signUp(req, res) {
    try {
      //B0: kiểm tra(validate) dữ liệu hợp lệ
      const { error } = authValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const listErrors = error.details.map((item) => item.message);
        return res.status(400).json({
          message: listErrors,
        });
      }
      //B1: lấy dữ liệu người dùng gửi lên
      const { email, password } = req.body;
      //B2: kiểm tra email đã tồn tại trong db không?
      const existedEmail = await User.findOne({ email });
      if (existedEmail) {
        //nếu email đã có trong db
        return res.status(400).json({
          message: "Email đã được sử dụng",
        });
      }
      //B3: mã hóa password: bcryptjs.hash(duLieuMaHoa,soLanLapMaHoa)
      const hashedPass = await bcryptjs.hash(password, 10);
      //B4: lưu dữ liệu vào db
      const user = await User.create({
        email,
        password: hashedPass,
      });
      //B5: trả dữ liệu về
      res.status(200).json({
        message: "Đăng ký thành công",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: "Lỗi",
      });
    }
  }

  async signIn(req, res) {
    try {
      const { error } = authValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const listErrors = error.details.map((item) => item.message);
        return res.status(400).json({
          message: listErrors,
        });
      }
      //B1: lấy dữ liệu ng dùng gửi lên
      const { email, password } = req.body;
      //B2: kiểm tra email có trong hệ thống hay không?
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "Thông tin không đúng",
        });
      }
      //B3: kiểm tra password có chính xác hay không?
      //bcryptjs.compare(duLieuMoiGuiLen,duLieuDaMaHoa)
      const checkedPass = await bcryptjs.compare(password, user.password);
      if (!checkedPass) {
        //nếu pass sai
        return res.status(400).json({
          message: "Thông tin không đúng",
        });
      }
      //B4: tạo ra token và trả về
      const token = jwt.sign(
        { id: user.id }, //payload: dữ liệu dùng để tạo token
        "wd19202", //secretKey
        { expiresIn: "1d" } //thời gian hết hạn: 2 cách: (Number: đơn vị là giây) (String: 1h, 2d)
      );
      //B5: trả dữ liệu về
      res.status(200).json({
        message: "Đăng nhập thành công",
        data: user,
        token,
      });
    } catch (error) {
      res.status(400).json({
        message: "Lỗi",
      });
    }
  }
}

export default AuthController;
