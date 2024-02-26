import express from "express";
import {getUsers, loginUser, regUser,ValidateEmail, ValidateCod, UpdateUserData} from "../controllers/users.controller.js"
import { verifyToken } from "../Resources/verifyToken.js";

const userRoutes = express();

//get all users
userRoutes.get('/api/users', verifyToken, getUsers);

//login user
userRoutes.post('/api/login', loginUser);

//User Register
userRoutes.post('/api/register', regUser);

//validate Email to Register
userRoutes.post('/api/email_validate', ValidateEmail);

//validate codes to login Ip new
userRoutes.post('/api/code_validate', ValidateCod);

//update user data
userRoutes.put('/api/users/update',verifyToken, UpdateUserData)

export default userRoutes;