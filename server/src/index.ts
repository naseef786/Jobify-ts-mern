import express , {Request,Response} from 'express'
import { jobs} from './data';
import cors from 'cors'
const app = express()
 
app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))

app.get('/api/jobs',(req:Request,res:Response) => {
    res.json(jobs)
})

const PORT = 4000 
app.listen(PORT,()=>{
    console.log(  `server started at http://localhost:${PORT}`)
})

