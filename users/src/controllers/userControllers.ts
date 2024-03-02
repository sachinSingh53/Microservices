import { User,IUser } from '../models/usersSchema';
import {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const maxAge:number = 3*24*60*60;
const createToken = (id:any) => {
    return jwt.sign({ id },'my_secret',{
        expiresIn: maxAge
    });
} 

export const register = async (req:Request,res:Response)=>{
    try{
        const userData:IUser = req.body;
        const user = await User.create(userData);
        const token:any = createToken(user._id);
        res.cookie('jwt',token,{ httpOnly: true,maxAge:maxAge*1000});
        res.status(200).json({
            status:'success',
            user_id:user._id,
            message:'registered successfully'
        })
    }
    catch(err:any){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

export const login = async(req:Request,res:Response)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if(user){
            const auth = await bcrypt.compare(password,user.password);
            if(auth){
                const token:any = createToken(user._id);
                res.cookie('jwt',token,{ httpOnly: true,maxAge:maxAge*1000});
                return res.status(200).json({
                    status:'success',
                    message:'loggedIn successfully'
                });
            }
            else{
                throw new Error('Incorrect email or Password');
            }
        }
        else{
            throw new Error('Incorrect email or Password');
        }
    }
    catch(err:any){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

export const logout = async(req:Request,res:Response)=>{
    try{
        res.cookie('jwt','',{maxAge:1});
        res.status(200).json({
            status:'success',
            message:'goodbye'
        })
    }
    catch(err:any){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

