import { createContext, useContext, useState, useEffect } from "react";
import { loadTransactions, saveTransactions } from "../utils/storage";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  useEffect(() => {
  saveTransactions(transactions);
}, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}