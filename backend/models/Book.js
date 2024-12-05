import mongoose from "mongoose"; //kết nối với CSDL

const Schema = mongoose.Schema; //khởi tạo Schema
const BookSchema = new Schema(
    {
        //khai báo trường dữ liệu trong bảng
        //tenTruong: { type: , required: , unique: }
        title: { type: String, require: true },
        author: { type: String, require: true },
        price: { type: Number, require: true },
        image: { type: String }
    },
    { timestamps: true } //thêm trường created_at và updated_at 
)
const Book = mongoose.model('book', BookSchema);
export default Book;