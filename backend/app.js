import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import namesRoutes from "./routes/names.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

//   Allow all origins (for dev)
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/names", namesRoutes);
app.use("/api/admin", adminRoutes); 

// Error handler
app.use(errorHandler);

export default app;
