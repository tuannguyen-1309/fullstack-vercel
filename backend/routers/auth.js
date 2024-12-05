import Router from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router(); 
const authControl = new AuthController();

authRouter.post('/signup', authControl.signUp); //Đăng ký
authRouter.post('/signin', authControl.signIn); //Đăng nhập

export default authRouter;