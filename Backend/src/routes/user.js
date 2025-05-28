import express from 'express';
import {  userLoggedIn } from '../middleware/checkUserMiddelware.js';
import { register, login, logout } from '../controllers/userController.js';

const router = express.Router();

router.post("/login",login);

router.post("/register",register);

router.post("/logout",logout);

// router.put("/profileUpdate",userLoggedIn, profile);

// router.get("/checkUser",userLoggedIn, checkUser);


export default router;
