export interface PaymentOption {
  id: string;
  label: string;
  months: number;
  monthlyPayment: number;
  totalAmount?: number;
  isCash?: boolean;
}

export interface ClientData {
  name: string;
  spouseName: string;
  location: string;
}

export interface ExpenseData {
  bottledWater: number;
  cleaningProducts: number;
}
