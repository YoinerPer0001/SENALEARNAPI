import express from "express"
import userRoutes from "./v1/routes/users.routes.js";
import RoutesCursos from "./v1/routes/cursos.routes.js";
import routesCategorias from "./v1/routes/categorias.routes.js";
import routesObjCourses from "./v1/routes/objetivos_cursos.routes.js";
import routesModCur from "./v1/routes/modulos_cursos.routes.js";
import contModRoutes from "./v1/routes/contenido_modulo.routes.js";
import routesLocation from "./v1/routes/localizacion.routes.js";
import routesTokens from "./v1/routes/tokens.routes.js";
import routesRoles from "./v1/routes/roles.routes.js";
import routesOptions from "./v1/routes/opciones.routes.js";
import routesOptionsRoles from "./v1/routes/opciones_roles.routes.js"
import routesInscripciones from "./v1/routes/inscripciones.routes.js";
import routesCertificados from "./v1/routes/certificados.routes.js";
import routesEvaluaciones from './v1/routes/evaluaciones.routes.js'
import routesPreguntasEval from "./v1/routes/preguntasEval.routes.js";
import routesRespuestasEval from "./v1/routes/respuestasEval.routes.js";
import routesUsuario_Cont from "./v1/routes/usuario_contenido.routes.js";
import routesResult from "./v1/routes/resultadosEval.routes.js";
import routesReqPrev from "./v1/routes/requisitos_previos.routes.js"
import statRoutes from "./v1/routes/estatistics.routes.js";
import routesNotificaciones from "./v1/routes/notificaciones.routes.js";
import routesNotUsu from "./v1/routes/notificaciones_usuarios.routes.js";
import cors from "cors"


const app = express();

const port = 3000 || process.env.PORT;


app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

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
app.use(routesOptionsRoles);
app.use(routesInscripciones);
app.use(routesCertificados);
app.use(routesEvaluaciones);
app.use(routesPreguntasEval)
app.use(routesRespuestasEval);
app.use(routesUsuario_Cont);
app.use(routesResult);
app.use(routesReqPrev);
app.use(statRoutes)
app.use(routesNotificaciones)
app.use(routesNotUsu)

app.listen(port,()=>{
    console.log("Server run in port: " + port);
});
