import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async() => {
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL );
        console.log(`connected to mogodb database ${conn.connection.host}`);
    } catch (error) {
        console.log(`error in mongodb &{error}`);
    }

};
export default connectDB;