import { statisticsPanel, GetCoursesDest, getUserStatistics } from "../../controllers/estatistics.controller.js";
import express from 'express'
import { adminPermiso } from "../../middlewares/managePermissions.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const statRoutes = express();

statRoutes.get('/api/statistics/panel',verifyToken, adminPermiso,statisticsPanel )

statRoutes.get('/api/statistics/courses/featured',verifyToken, adminPermiso,GetCoursesDest)

statRoutes.get('/api/statistics/user/:id',verifyToken,getUserStatistics)


export default statRoutes;