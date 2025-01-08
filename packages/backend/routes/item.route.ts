import { Router } from "express";
import {
	createItemController,
	deleteItemController,
	getAllItemsController,
	updateItemController,
} from "../controllers/item.controller";
import { RequestValidatorMiddleware } from "../middleware/RequestValidator";
import {
	CreateItemRequestSchemma,
	DeleteItemRequestSchema,
	UpdateItemRequestSchema,
} from "shared";

const router = Router();

router.get("/", getAllItemsController);
router.post(
	"/",
	RequestValidatorMiddleware(CreateItemRequestSchemma),
	createItemController
);
router.put(
	"/:id",
	RequestValidatorMiddleware(UpdateItemRequestSchema),
	updateItemController
);
router.delete(
	"/:id",
	RequestValidatorMiddleware(DeleteItemRequestSchema),
	deleteItemController
);

export default router;
