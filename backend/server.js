import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
//app config

const app = express()
const port = process.env.PORT || 4000

//middlewares

app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://docotrappointment-1.onrender.com',
  'https://docotrappointment-admin.onrender.com'
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
connectDB()
connectCloudinary()

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter)
//localhost : 4000/api/admin/add-doctor

app.get('/',(req,res) => {
  res.send('API WORKING')
})

app.listen(port, () => console.log("Server Started",port))