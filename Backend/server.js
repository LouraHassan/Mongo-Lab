import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routers/routers.js";

const app = express();
app.use(express.json());
app.use("/", router);

dotenv.config();
const PORT = process.env.PORT;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("database connected");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
