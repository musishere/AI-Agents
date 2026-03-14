import express from "express";
import cors from "cors";
import { askStructured } from "./ask-core";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: true,
    methods: ["POST", "GET", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: false,
  }),
);

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "query required" });
    }

    const out = await askStructured(query);

    return res.status(200).json(out);
  } catch (error) {
    return res.status(500).json({ message: "Intervel server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Api is listening to port ${PORT}`);
});
