import express from "express";
import { getUsers, loginUser, regUser, ValidateEmail, ValidateCod, UpdateUserData, getUserxId , closeSession, deleteUser} from "../../controllers/users.controller.js"
import { verifyToken } from "../../middlewares/verifyToken.js";
import { createValidation, CodeValidationIp, CodeValidationEmail, UpdateValidation ,LoginValidation} from "../../Validators/users.validator.js";
import { adminPermiso, AdminInstPermissions } from "../../middlewares/managePermissions.js";

const userRoutes = express();

//get all users

userRoutes.get('/api/v1/users', verifyToken, adminPermiso,getUsers);

userRoutes.get('/api/v1/users/:id', verifyToken, adminPermiso, getUserxId);

//login user
userRoutes.post('/api/v1/login',LoginValidation, loginUser);

userRoutes.get('/api/v1/user/logout', verifyToken, closeSession)

//User Register
userRoutes.post('/api/v1/register', createValidation, regUser);

//validate Email to Register
userRoutes.post('/api/v1/email_validate', CodeValidationEmail, ValidateEmail);

//validate codes to login Ip new
userRoutes.post('/api/v1/ip_validation', CodeValidationIp, ValidateCod);

//update user data
userRoutes.put('/api/v1/users/update/:id',UpdateValidation, verifyToken, adminPermiso, UpdateUserData)

//delete user

userRoutes.delete('/api/v1/users/delete/:id',verifyToken, adminPermiso, deleteUser)





export default userRoutes;