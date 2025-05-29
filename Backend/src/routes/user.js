import express from 'express';
import {  userLoggedIn } from '../middleware/checkUserMiddleware.js';
import { register, login, logout , checkUser, updateProfile} from '../controllers/userController.js';

const router = express.Router();

router.post("/login",login);

router.post("/register",register);

router.post("/logout",logout);

router.put("/profileUpdate",userLoggedIn, updateProfile);

router.get("/checkUser",userLoggedIn, checkUser);


export default router;
