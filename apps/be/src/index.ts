import express from "express";
import prisma from "@repo/db/prisma";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const user = await prisma.user.findFirst();

  res.json(user);
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  res.json(user);
});

app.listen(3001);
