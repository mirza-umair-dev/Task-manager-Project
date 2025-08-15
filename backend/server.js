import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import upload from './middleware/uploadMiddleware.js';
import path from 'path'
import { errorHandler } from './middleware/errorMiddleware.js';
//Middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/users',userRoutes);

app.use('/api/auth/upload-image', upload.single('profileimage'), (req, res) => {
  if(!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`, });
});

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//Defining port
const PORT = process.env.PORT ;

//Connecting database
connectDb();

// Basic route for testing      
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
});


app.use((req, res, next) => {
  res.status(404);
  throw new Error(`Route ${req.originalUrl} not found`);
});
app.use(errorHandler);