import { prismaClient } from "db/client"
import { redisClient } from "redis/client"
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json)
app.use(cors())



app.listen(8080)