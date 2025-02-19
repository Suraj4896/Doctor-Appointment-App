import mongoose from 'mongoose';

//database connection using mongodb atlas
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('database connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
}

export default connectDB;