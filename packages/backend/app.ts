import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import itemRoute from "./routes/item.route";
import { HttpErrorHandlerMiddleware } from "./middleware/ErrorHandler";

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/items", itemRoute);

// Error handling middleware
app.use(HttpErrorHandlerMiddleware);

// Start server
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
