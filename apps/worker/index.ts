import express from 'express';
import cors from 'cors'
import {prismaClient} from "db/client"

const app = express()

app.use(express.json())
app.use(cors())

app.post("/prompt", async(req, res) => {
   const {prompt, projectId} = req.body 

   await prismaClient.prompt.create({
    data: {
        content: prompt,
        projectId,
        type: "USER"
    }
   })
})

app.listen(8081)