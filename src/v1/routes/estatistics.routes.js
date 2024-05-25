import { statisticsPanel, GetCoursesDest, getUserStatistics, getCoursesNumbers, getPromContView ,getEstAvzCurso} from "../../controllers/estatistics.controller.js";
import express from 'express'
import { AdminInstPermissions, adminPermiso } from "../../middlewares/managePermissions.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const statRoutes = express();

statRoutes.get('/api/statistics/panel',verifyToken, adminPermiso,statisticsPanel )

statRoutes.get('/api/statistics/courses/featured',verifyToken, adminPermiso,GetCoursesDest)

statRoutes.get('/api/statistics/user/:id',verifyToken,getUserStatistics)

statRoutes.get('/api/statistics/course/:id',verifyToken, AdminInstPermissions, getCoursesNumbers)

statRoutes.get('/api/statistics/users/course/activity/:id/date/:date/:datef',verifyToken, AdminInstPermissions, getPromContView)

statRoutes.get('/api/statistics/course/advanced/:id', verifyToken, AdminInstPermissions,getEstAvzCurso)


export default statRoutes;