import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import Product from "../models/product.model";

export const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const transactionData = req.body;

    if (req.file) {
      transactionData.paymentProof = req.file.path;
    } else {
      res.status(400).json({ message: "Payment proof is required" });
      return;
    }

    if (typeof transactionData.purchasedItems === "string") {
      try {
        transactionData.purchasedItems = JSON.parse(
          transactionData.purchasedItems,
        );
      } catch (error) {
        console.log(
          "purchased type is : ",
          typeof transactionData.purchasedItems,
        );
        console.log("Error type of purchasedItems : ", error);
        res.status(500).json({ message: "Error while creating transaction" });
        return;
      }
    }

    transactionData.status = "pending";

    const transaction = new Transaction(transactionData);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.log("Error while creating transaction : ", error);
    res.status(500).json({ message: "Error while creating transaction" });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("purchasedItems.productId");
      console.log("ambil transaction")
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error while fetching transactions : ", error);
    res.status(500).json({ message: "Error while fetching transactions" });
  }
};


export const getTransactionById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate(
      "purchasedItems.productId",
    );
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.log("Error while fetching transaction By Id : ", error);
    res.status(500).json({ message: "Error while fetching transaction" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    if (status === "paid" && transaction.status !== "paid") {
      //pengurangan stock barang
      for (const item of transaction.purchasedItems) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.qty },
        });
      }
    }

    const updtTransaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    res.status(200).json(updtTransaction);
  } catch (error) {
    console.log("Error while updating transaction : ", error);
    res.status(500).json({ message: "Error while updating transaction" });
  }
};
