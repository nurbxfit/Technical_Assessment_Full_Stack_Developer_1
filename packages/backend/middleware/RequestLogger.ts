import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const RequestLoggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info({
		method: req.method,
		url: req.originalUrl,
		headers: req.headers,
		body: req.body,
		query: req.query,
		params: req.params,
	});
	next();
};
