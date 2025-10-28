import { prismaClient } from "db/client";
import { Router } from "express";
import { authMiddleware } from "../middleware";

const route = Router()

route.post("/projects", authMiddleware, async (req, res) => {
    const { prompt } = req.body;
    const userId = req.userId!;
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

route.get("/projects", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const projects = await prismaClient.project.findFirst({
        where: {
            userId
        }
    })
    return (projects)
})

export default route;