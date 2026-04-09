import { createContext} from "react";

export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
};

export type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (tx: Transaction) => void;
  getAllTransactions: () => Transaction[];
};

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

