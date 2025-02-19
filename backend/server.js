import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

//create express app
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors()); //allow the frontend to access the backend

//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
//localhost:4000/api/admin/add-doctor

//api routes
app.get('/', (req, res)=> {
    res.send('API is running...');
})

//listen to the server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
