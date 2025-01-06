import { Request, Response, NextFunction } from "express";
import { itemService } from "../services/item.service";

export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await itemService.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const createItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = {
      name: req.body["name"],
      description: req.body["description"],
      price: req.body["price"],
    };

    const createdItem = await itemService.create(item);
    res.status(200).json(createdItem);
  } catch (err) {
    next(err);
  }
};

export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id ? parseInt(req.params.id) : -1;
    if (id < 0) throw new Error("invalid id");
    const item = {
      name: req.body["name"],
      description: req.body["description"],
      price: req.body["price"],
    };
    const updatedItem = await itemService.update(id, item);
    if (!updatedItem) {
      res.status(404).json({
        message: "Item not found",
      });
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id ? parseInt(req.params.id) : -1;
    if (id < 0) throw new Error("invalid id");
    const deletedItem = await itemService.delete(id);
    if (!deletedItem) {
      res.status(404).json({
        message: "Item not found",
      });
    } else {
      res.status(200).json(deletedItem);
    }
  } catch (err) {
    next(err);
  }
};
