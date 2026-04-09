import { createContext, useContext, useState, useEffect } from "react";
import { loadTransactions, saveTransactions } from "../utils/storage";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  useEffect(() => {
  saveTransactions(transactions);
}, [transactions]);

function addTransaction(tx) {
    setTransactions(prev => [tx, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function updateTransaction(updatedTx) {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTx.id ? updatedTx : t))
    );
  }

  function getAllTransactions() {
    return transactions;
  }

  return (
    <TransactionContext.Provider value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        getAllTransactions,
      }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}