import Product from "../models/product.model";
import { Request, Response } from "express";

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
    console.log("atas", req.body)
  try {
    const productData = req.body;
    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log("Error while creating product : ", req.body);
    res.status(500).json({ message: "Error while creating product" });
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error while fetching products : ", error);
    res.status(500).json({ message: "Error while fetching products" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("Error while fetching product By Id : ", error);
    res.status(500).json({ message: "Error while fetching product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body;
    const { id } = req.params;
    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const updatedCategory = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (!updatedCategory) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("Error while updating product : ", error);
    res.status(500).json({ message: "Error while updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error while deleting product : ", error);
    res.status(500).json({ message: "Error while deleting product" });
  }
};
