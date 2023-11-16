import express from "express";
import {getUsers, loginUser, verifyToken, regUser,ValidateEmail} from "../controllers/users.controller.js"

const userRoutes = express();

userRoutes.get('/api/users', verifyToken, getUsers);

userRoutes.post('/api/login', loginUser);

userRoutes.post('/api/refresh-token',verifyToken );

userRoutes.post('/api/register', regUser);

userRoutes.post('/api/emailvalidate', ValidateEmail);

export default userRoutes;