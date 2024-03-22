import  express  from "express";

import dotenv from 'dotenv';

dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// import userRoutes from './routes/userRoutes.js'

const  mongoString =process.env.DATABASE_URL
const app = express();
mongoose.connect(mongoString)
const database  = mongoose.connection





app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

//database connection server 
database.on('error',(error) => {
    console.log(error)
})

database.once('connected',()=>{
    console.log('Database Connected')
})