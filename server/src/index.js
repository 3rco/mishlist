import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users-routes.js";
import { createSuperman } from "./controllers/users-controllers.js";

dotenv.config();

const MONGODB = process.env.MONGODB || "mongodb://localhost/mishlist";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("🛰  MongoDB connected!");
    createSuperman(process.env);
  })
  .catch((error) => {
    console.log("🔥 MongoDB connection failed!\n", error);
  });

const server = express();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
server.use(express.json());
server.use("/api", userRoutes);

server.listen(PORT, () => {
  console.log(`🚀 mishlist server runing Port: ${PORT}...`);
});
