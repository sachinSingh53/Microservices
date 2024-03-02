import express, {Application,Request,Response} from 'express'
import{config} from 'dotenv'
config();
import { connectToMongoDB } from './config/db'
import {authRouter} from './routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


async function connectDB() {
    try {
        await connectToMongoDB(); // Establish MongoDB connection 
    } catch (error) {
        console.error('Error connecting DB:', error);
    }
}
connectDB();


const app:Application = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cookieParser())
// app.get('/',(req:Request,res:Response)=>{
//     res.send('from user')
// })

app.use('/api/v1/auth',authRouter);


const PORT:Number = Number(process.env.PORT);



app.listen(PORT,()=>{
    console.log(`listning on port ${PORT}`);
})