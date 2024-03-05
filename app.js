import express from "express"
import userRoutes from "./routes/users.routes.js";
import RoutesCursos from "./routes/cursos.routes.js";
import routesCategorias from "./routes/categorias.routes.js";
import routesObjCourses from "./routes/objetivos_cursos.routes.js";
import routesModCur from "./routes/modulos_cursos.routes.js";
import contModRoutes from "./routes/contenido_modulo.routes.js";
import routesLocation from "./routes/localizacion.routes.js";
import routesTokens from "./routes/tokens.routes.js";
import routesRoles from "./routes/roles.routes.js";
import routesOptions from "./routes/opciones.routes.js";
import {swaggerDocs} from "./v1/swagger.js"
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
app.use(contModRoutes);
app.use(routesLocation);
app.use(routesTokens);
app.use(routesRoles);
app.use(routesOptions);



app.listen(3000,()=>{
    console.log("Server run in port 3000");
    swaggerDocs(app,3000)
});