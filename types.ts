
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
  email: string;
  zipCode: string;
  lang: 'pt' | 'en' | 'es';
}

export interface ExpenseData {
  bottledWater: number;
  cleaningProducts: number;
}
