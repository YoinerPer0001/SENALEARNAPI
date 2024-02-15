import express from "express"
import userRoutes from "./routes/users.routes.js";
import RoutesCursos from "./routes/cursos.routes.js";
import routesCategorias from "./routes/categorias.routes.js";
import cors from "cors"


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use(userRoutes);
app.use(RoutesCursos);
app.use(routesCategorias);



app.listen(3000,()=>{
    console.log("Server run in port 3000");
});