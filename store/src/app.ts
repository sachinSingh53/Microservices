import express, {Application,Request,Response} from 'express'
import{config} from 'dotenv'
config();
import { connectToMongoDB } from './config/db'


async function connectDB() {
    try {
        await connectToMongoDB(); // Establish MongoDB connection 
    } catch (error) {
        console.error('Error connecting DB:', error);
    }
}
connectDB();


const app:Application = express();


app.get('/',(req:Request,res:Response)=>{
    res.send('from store');
})
app.get('/check',(req:Request,res:Response)=>{
    res.send('fine');
})


const PORT:Number = Number(process.env.PORT);



app.listen(PORT,()=>{
    console.log(`listning on port ${PORT}`);
})