import express from "express"
import userRoutes from "./routes/users.routes.js";
import RoutesCursos from "./routes/cursos.routes.js";
import routesCategorias from "./routes/categorias.routes.js";
import routesObjCourses from "./routes/objetivos_cursos.routes.js";
import routesModCur from "./routes/modulos_cursos.routes.js";
import cors from "cors"


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use(userRoutes);
app.use(RoutesCursos);
app.use(routesCategorias);
app.use(routesObjCourses);
app.use(routesModCur);



app.listen(3000,()=>{
    console.log("Server run in port 3000");
});