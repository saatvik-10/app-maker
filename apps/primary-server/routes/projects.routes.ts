import { prismaClient } from "db/client";
import { Router } from "express";

const route = Router()

route.post("/projects", async (req, res) => {
    const { prompt } = req.body;
    //@ts-ignore
    const { userId } = req.userId;
    //logic to get name
    const description = prompt.split("\n")[0]
    const project = await prismaClient.project.create({
        data: {
            description,
            userId
        }
    })
    res.json({ projectId: project.id })
})

route.get("/projects", async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const projects = await prismaClient.project.findUnique({
        where: {
            userId
        }
    })
    return (projects)
})