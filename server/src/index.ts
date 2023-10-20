import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import run from '../Config/config';
import morgan from 'morgan'
import 'express-async-errors'
import dotenv from 'dotenv'
import { jobRouter } from '../routers/jobRouter';
import { seedRouter } from '../routers/seedRouter';
import adminRouter from '../routers/adminRouter'
import recruiterRouter from '../routers/recruiterRouter'
import  userRouter  from '../routers/candidateRouter'
import path from 'path'
import errrorMiddleware from '../middlewares/errrorMiddleware';


dotenv.config()



const app = express()
app.use('/',express.static(path.join(__dirname,'./public')))


const PORT = 4000;
run().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(console.dir);
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))


app.use('/api/jobs', jobRouter)
app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/recruiter',recruiterRouter)



//validation miidleware
app.use(errrorMiddleware)





