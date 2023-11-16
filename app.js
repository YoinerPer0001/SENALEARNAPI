import express from "express"
import userRoutes from "./routes/users.routes.js";
import cors from "cors"


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use(userRoutes);





app.listen(3000,()=>{
    console.log("Server run in port 3000");
});