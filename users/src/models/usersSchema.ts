import mongoose from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}



const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'enter a valid email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'enter a valid password'],
        minlength: [6, 'password must have minimum 6 characters']
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// userSchema.static.login = async function (email: string, password: string) {
//     const user = await User.findOne({ email });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         }
//         throw new Error('Incorrect email or Password');
//     }
//     throw new Error('Incorrect email or Password');
// }

const User = mongoose.model<IUser>('User', userSchema);




export { IUser, User }

