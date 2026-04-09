import { type Transaction } from '../constants/transactionModel';

const STORAGE_KEY = "flint_transactions";

export function loadTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function clearTransactions(): void {
  localStorage.removeItem(STORAGE_KEY);
}