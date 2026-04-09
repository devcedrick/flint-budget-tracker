import { loadTransactions, saveTransactions } from "../utils/storage.ts";
import { useState, useEffect, type ReactNode } from 'react';
import { TransactionContext, type Transaction } from "./TransactionContext";

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  function addTransaction(tx: Transaction) {
    setTransactions(prev => [tx, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function updateTransaction(updatedTx: Transaction) {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTx.id ? updatedTx : t))
    );
  }

  function getAllTransactions() {
    return transactions;
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, updateTransaction, getAllTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

