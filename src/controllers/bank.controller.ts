import { Request, Response } from "express";
import Bank from "../models/bank.model";

export const createBank = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bank = new Bank(req.body);
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    console.log("Error whule create new bank : ", error);
    res.status(500).json({ message: "Error while create new bank" });
  }
};

export const getBanks = async (req: Request, res: Response): Promise<void> => {
  try {
    const banks = await Bank.find().sort({ createdAt: -1 });
    res.status(200).json(banks);
  } catch (error) {
    console.log("Error while fetching banks data : ", error);
    res.status(500).json({ message: "Error while fetching banks data" });
  }
};

export const getBanksById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const bank = await Bank.findById(id);
    if (!bank) {
      res.status(404).json({ message: "Bank not found" });
      return;
    }
    res.status(201).json(bank);
  } catch (error) {
    console.log("Error while fetching banks data : ", error);
    res.status(500).json({ message: "Error while fetching banks data" });
  }
};

export const updateBank = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const bank = await Bank.findByIdAndUpdate(id, req.body, { new: true });
    if (!bank) {
      res.status(404).json({ message: "Bank not found" });
      return;
    }
    res.status(201).json(bank);
  } catch (error) {
    console.log("Error while updating banks data : ", error);
    res.status(500).json({ message: "Error while updating banks data" });
  }
};

export const deleteBank = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const delBank = await Bank.findByIdAndDelete(id);
    if (!delBank) {
      res.status(404).json({ message: "Bank not found" });
      return;
    }
    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    console.log("Error while deleting banks data : ", error);
    res.status(500).json({ message: "Error while deleting banks data" });
  }
};
