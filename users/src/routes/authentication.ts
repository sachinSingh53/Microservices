import express from "express";
export const router = express.Router();
import {register,login,logout} from '../controllers/userControllers';


router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);


