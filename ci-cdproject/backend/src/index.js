import express from "express";
import { db } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/tasks", (req, res) => {
  const q = "INSERT INTO tasks (`title`) VALUES (?)";
  const values = [req.body.title];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Task created" });
  });
});

app.listen(8080, () => {
  console.log("Backend running on port 8080");
});
