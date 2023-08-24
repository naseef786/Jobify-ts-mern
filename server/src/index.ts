import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
const db = require('../Config/config')
import 'express-async-errors'
import dotenv from 'dotenv'
import { jobRouter } from '../routers/jobRouter';
import { seedRouter } from '../routers/seedRouter';
import adminRouter from '../routers/adminRouter'
import  userRouter  from '../routers/candidateRouter'
import path from 'path'
import errrorMiddleware from '../middlewares/errrorMiddleware';


dotenv.config()



const app = express()
app.use('/',express.static(path.join(__dirname,'./public')))

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/jobs', jobRouter)
app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)
app.use('/api/admin',adminRouter)

//validation miidleware
app.use(errrorMiddleware)

const PORT = 4000
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})

