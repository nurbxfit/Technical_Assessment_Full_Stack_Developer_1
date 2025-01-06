import { Router } from "express";
import {
  createItemController,
  deleteItemController,
  getAllItemsController,
  updateItemController,
} from "../controllers/item.controller";

const router = Router();

router.get("/", getAllItemsController);
router.post("/", createItemController);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;
