import { NextFunction, Response, Request } from "express";
import { ZodSchema } from "zod";

export const RequestValidatorMiddleware =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error) {
			next(error);
		}
	};
