import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
        });
    console.log('MongoDB Connected Successfuly');
    }
    catch(err){
        console.error('Cannot connect to MongoDB:', err.message);
    }
}

export default connectDb;