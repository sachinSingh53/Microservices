import express, {Application,Request,Response} from 'express'
import{config} from 'dotenv'


config();



const app:Application = express();


app.get('/',(req:Request,res:Response)=>{
    res.send('from store');
})


const PORT:Number = Number(process.env.PORT);



app.listen(PORT,()=>{
    console.log(`listning on port ${PORT}`);
})