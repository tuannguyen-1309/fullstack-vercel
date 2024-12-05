import { Router } from "express";
import BookController from "../controllers/BookController.js";

const apiRouter = Router();
const bookControl = new BookController();

apiRouter.get("/books", bookControl.apiList); //lấy danh sách bản ghi
apiRouter.get("/books/:id", bookControl.apiDetail); //lấy chi tiết
apiRouter.delete("/books/:id", bookControl.apiDelete);
apiRouter.post("/books", bookControl.apiCreate);
apiRouter.put("/books/:id", bookControl.apiUpdate);

export default apiRouter;
