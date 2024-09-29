import  express  from "express";
import bodyParser from "body-parser";
import {config} from './config/server-config.js'
import apiRoutes from './routes/index.js';
import connectDB from './config/db.js';
const startAndStop = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = config.PORT
    app.use('/api', apiRoutes)
    connectDB();
    app.listen(port, ()=>{
    console.log(`moviecatelog  service is running at http://localhost:${port}`) 
} );
}
startAndStop();