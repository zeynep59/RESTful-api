import app from "./app.js";
import config from "../config.js";

app.listen(5000, () =>{
    console.log(config.app_name+" Started on Port 5000")
})