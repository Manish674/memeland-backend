import app from "./app"; 
import config from "config";
import { connectDB } from "./utils/dbConnect";



const port = config.get<number>("port");
const host = config.get<string>('host'); 

connectDB()

app.listen(port, host, () => {
  console.log("running!")
})
