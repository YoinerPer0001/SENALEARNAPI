import { statisticsPanel, GetCoursesDest } from "../../controllers/estatistics.controller.js";
import express from 'express'
import { adminPermiso } from "../../middlewares/managePermissions.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const statRoutes = express();

statRoutes.get('/api/statistics/panel',verifyToken, adminPermiso,statisticsPanel )

statRoutes.get('/api/statistics/courses/featured',verifyToken, adminPermiso,GetCoursesDest)


export default statRoutes;