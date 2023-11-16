import express from "express";
import {getUsers, loginUser, verifyToken, regUser,ValidateEmail} from "../controllers/users.controller.js"

const userRoutes = express();

userRoutes.get('/users', verifyToken, getUsers);

userRoutes.post('/login', loginUser);

userRoutes.post('/refresh-token',verifyToken );

userRoutes.post('/register', regUser);

userRoutes.post('/emailvalidate', ValidateEmail);

export default userRoutes;