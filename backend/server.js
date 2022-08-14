import  express from 'express'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cors from  'cors'




const app=express();
app.use(cors()) 
app.use(express.json())
connectDB();

app.get('/',(req,res)=>{
    res.send('API is running')
})


app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)



app.listen(5000,console.log(`surver running on port 5000`))
