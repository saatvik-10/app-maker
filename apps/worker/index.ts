import express from 'express';
import cors from 'cors'
import { prismaClient } from "db/client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from './systemPrompt';
import { ArtifactProcessor } from './parser';
import { onFileUpdate, onShellCommand } from "./os";

const app = express()

app.use(express.json())
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post("/prompt", async (req, res) => {
    const { prompt, projectId } = req.body

    const promptDb = await prismaClient.prompt.create({
        data: {
            content: prompt,
            projectId,
            type: "USER"
        }
    })

    const project = await prismaClient.project.findUnique({
        where: { id: projectId }
    });

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    const allPrompts = await prismaClient.prompt.findMany({
        where: {
            projectId
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: systemPrompt
    });

    const artifactProcessor = new ArtifactProcessor("", onFileUpdate, onShellCommand);
    let artifact = "";

    try {
        const history = allPrompts.slice(0, -1).map((p: any) => ({
            role: p.type === "USER" ? "user" : "model",
            parts: [{ text: p.content }],
        }))

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessageStream(prompt);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            artifactProcessor.append(chunkText);
            artifactProcessor.parse();
            artifact += chunkText;
        }

        console.log("done!");

        await prismaClient.prompt.create({
            data: {
                content: artifact,
                projectId,
                type: "SYSTEM",
            },
        });

        // onPromptEnd(promptDb.id);

        res.json({ response: artifact });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Failed to process prompt" });
    }
})

app.listen(8081)