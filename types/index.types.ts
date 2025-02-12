export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: {
    id: string;
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
}
