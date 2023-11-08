import { Request, Response } from "express";
import TodoList from "../models/list.model";

import cloudinary, { uploadImage } from "../config/cloudinary";

export const createList = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const imageUrl = req.file?.path;
  const fileName = req.file?.originalname || "";

  try {
    if (!imageUrl) {
      res.status(400).json({ message: "Image file is required" });
    } else {
      const image = uploadImage(imageUrl, "Todo");
      // console.log(image.secure_url);
      const data = await TodoList.create({
        title,
        description,
        image: (await image).secure_url,
      });
      console.log({ data });
      res.status(200).json({
        message: "data created successfully",
        imageUrl: (await image).secure_url,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllList = async (req: Request, res: Response) => {
  try {
    const getList = await TodoList.findAll();
    res.status(200).json(getList);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getList = await TodoList.findByPk(id);
    if (getList) {
      res.status(200).json(getList);
    } else {
      res.status(400).json({ message: "data not avilable" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProdunctById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const imageUrl2 = req.file?.path;

  try {
    const product = await TodoList.findByPk(id);
    if (product) {
      const image = uploadImage(imageUrl2, "Todo");
      const updatedProduct = await TodoList.update(
        { data, image },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: "updated successfully" });
    } else {
      res.status(400).json({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await TodoList.findByPk(id);
    if (product) {
      const deleteProduct = await product.destroy();
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(400).json({ message: "no data found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
