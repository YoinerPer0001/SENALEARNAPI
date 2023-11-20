import express from "express";
import {getUsers, loginUser, verifyToken, regUser,ValidateEmail, ValidateCod} from "../controllers/users.controller.js"

const userRoutes = express();

//get all users
userRoutes.get('/api/users', verifyToken, getUsers);

//login user
userRoutes.post('/api/login', loginUser);

//verify token bearer
userRoutes.post('/api/verifyToken',verifyToken );

//User Register
userRoutes.post('/api/register', regUser);

//validate Email to Register
userRoutes.post('/api/emailvalidate', ValidateEmail);

//validate codes to login Ip new
userRoutes.post('/api/codevalidate', ValidateCod);

export default userRoutes;