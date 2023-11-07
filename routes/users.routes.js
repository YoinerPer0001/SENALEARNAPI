import express from "express";
import {getUsers, loginUser, verifyToken,refreshToken, regUser, UpdateUser,ValidateEmail} from "../controllers/users.controller.js"

const userRoutes = express();

userRoutes.get('/users', verifyToken, getUsers);

userRoutes.post('/login', loginUser);

userRoutes.post('/refresh-token',verifyToken ,refreshToken );

userRoutes.post('/register', regUser);

userRoutes.put('/update-user',verifyToken, UpdateUser);

userRoutes.get('/emailvalidate/:id', verifyToken, ValidateEmail);

export default userRoutes;