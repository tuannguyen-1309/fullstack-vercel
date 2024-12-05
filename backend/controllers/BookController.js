import Book from "../models/Book.js";
import { bookValidator } from "../validations/book.js";

//khởi tạo class
class BookController {
  //API functions
  async apiList(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json({
        message: "Lấy dữ liệu thành công",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy dữ liệu",
        error: error.message,
      });
    }
  }

  async apiDetail(req, res) {
    try {
      const id = req.params.id;
      const book = await Book.findById(id);
      res.status(200).json({
        message: "Thành công",
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy chi tiết sách",
        error: error.message,
      });
    }
  }

  async apiDelete(req, res) {
    try {
      const id = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(id);
      res.status(200).json({
        message: "Xóa thành công",
        data: deletedBook,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi xóa sách",
        error: error.message,
      });
    }
  }

  async apiCreate(req, res) {
    try {
      const { error } = bookValidator.validate(req.body, { abortEarly: false });

      // Nếu có lỗi validation
      if (error) {
        // Lấy tất cả các lỗi và trả về cho người dùng
        const listErrors = error.details.map((item) => item.message);
        return res.status(400).json({
          message: listErrors,
        });
      }
      const data = req.body;
      const newBook = await Book.create(data);
      res.status(200).json({
        message: "Thành công",
        data: newBook,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi tạo sách",
        error: error.message,
      });
    }
  }

  async apiUpdate(req, res) {
    try {
      const { error } = bookValidator.validate(req.body, { abortEarly: false });

      // Nếu có lỗi validation
      if (error) {
        // Lấy tất cả các lỗi và trả về cho người dùng
        const listErrors = error.details.map((item) => item.message);
        return res.status(400).json({
          message: listErrors,
        });
      }
      const id = req.params.id;
      const data = req.body;
      const book = await Book.findByIdAndUpdate(id, data);
      res.status(200).json({
        message: "Thành công",
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi cập nhật sách",
        error: error.message,
      });
    }
  }
}

export default BookController;
