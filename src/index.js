import  express  from "express";
import bodyParser from "body-parser";
import {config} from './config/server-config.js'
import apiRoutes from './routes/index.js';
import connectDB from './config/db.js';
import {createGraphQLServer} from './graphql/graphql.js'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const startAndStop = () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = config.PORT
    //* for rest Api
    app.use('/api', apiRoutes)

    //* Initialize GraphQL Server
    createGraphQLServer(app);
    //* Construct __dirname in ES module
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

    // * Serve static files from the uploads directory
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    connectDB();
    app.listen(port, ()=>{
    console.log(`moviecatelog  service is running at http://localhost:${port}`) 
} );
}
startAndStop();