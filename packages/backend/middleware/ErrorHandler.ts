import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";

export const HttpErrorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack);

	if (err instanceof ZodError) {
		const formattedErrors = err.errors.map((error) => ({
			path: error.path.join("."),
			message: error.message,
		}));

		res.status(400).json({
			status: "error",
			message: "Validation failed!",
			errors: formattedErrors,
		});
	} else if (err instanceof PrismaClientKnownRequestError) {
		res.status(400).json({
			status: "error",
			message: "Database error",
			errors: [
				{
					path: err.meta?.modelName,
					message: err.meta?.cause ?? "Something went wrong!",
				},
			],
		});
	} else {
		res.status(500).json({
			status: "error",
			message: "Something went wrong",
			errors: [],
		});
	}
};
