export interface Transaction {
  id: string;
  type: 'income' | 'expense'; // This restricts it to only these two words
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}