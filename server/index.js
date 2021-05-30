import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"

import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running");
});