import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/TaskRoute.js'


// middleware
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const connectToDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected successfully!!");
  
  }
   catch (error) {
    console.error('Internal server error: ', error.message);
   }
    
}
connectToDB()

app.get('/tasks', (req, res) => {
  res.json("Hello World!!");
})

app.use(routes)



app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})