import  express  from "express";
import bodyParser from "body-parser";
import {config} from './config/server-config.js'
import apiRoutes from './routes/index.js';
import connectDB from './config/db.js';
import {createGraphQLServer} from './graphql/graphql.js'
const startAndStop = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = config.PORT
    //* for rest Api
    app.use('/api', apiRoutes)

    //* Initialize GraphQL Server
    createGraphQLServer(app);

    connectDB();
    app.listen(port, ()=>{
    console.log(`moviecatelog  service is running at http://localhost:${port}`) 
} );
}
startAndStop();