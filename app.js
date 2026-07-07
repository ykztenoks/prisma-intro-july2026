// const express = require("express")

import express from "express"
import morgan from "morgan"
import { prisma } from "./lib/prisma.js"
const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Server is running" })
})

app.get("/users", async (req, res) => {
  try {
    const response = await prisma.user.findMany()

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const foundUser = await prisma.user.findUnique({ where: { id: id } })

    return res.status(200).json(foundUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
})

app.post("/users", async (req, res) => {
  try {
    const { username, email } = req.body

    const response = await prisma.user.create({ data: { username, email } })

    return res.status(201).json({ msg: "user created", user: response })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
})

app.listen(8080, () => {
  console.clear()
  console.log("Server running on port 8080")
})
