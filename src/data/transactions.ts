import { PaymentMethod, PaymentStatus } from './orders';

export interface Transaction {
  tranId: string;
  valId: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  cardType?: string;
  bankGateway?: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  createdAt: string;
  validatedAt?: string;
}

export const mockTransactions: Transaction[] = [
  {
    tranId: 'TRAN_AA_20260915_7X9K2M',
    valId: 'VAL_20260915_A1B2C3',
    orderId: 'ORD-20260915-001',
    customerName: 'Fahmida Rahman',
    customerPhone: '+880 1712-345678',
    amount: 11600,
    paymentMethod: 'bKash',
    status: 'Success',
    bankGateway: 'bKash PGW',
    riskLevel: 'Low',
    createdAt: '2026-09-15T10:30:00+06:00',
    validatedAt: '2026-09-15T10:30:45+06:00',
  },
  {
    tranId: 'TRAN_AA_20260916_3P5Q8R',
    valId: 'VAL_20260916_D4E5F6',
    orderId: 'ORD-20260916-002',
    customerName: 'Tanvir Ahmed Khan',
    customerPhone: '+880 1898-765432',
    amount: 7350,
    paymentMethod: 'Nagad',
    status: 'Success',
    bankGateway: 'Nagad PGW',
    riskLevel: 'Low',
    createdAt: '2026-09-16T15:45:00+06:00',
    validatedAt: '2026-09-16T15:45:38+06:00',
  },
  {
    tranId: 'TRAN_AA_20260917_6Y1Z4W',
    valId: 'VAL_20260917_G7H8I9',
    orderId: 'ORD-20260917-003',
    customerName: 'Nusrat Jahan Priya',
    customerPhone: '+880 1567-890123',
    amount: 12500,
    paymentMethod: 'Visa',
    status: 'Success',
    cardType: 'Visa Credit',
    bankGateway: 'EBL Gateway',
    riskLevel: 'Low',
    createdAt: '2026-09-17T11:20:00+06:00',
    validatedAt: '2026-09-17T11:20:52+06:00',
  },
  {
    tranId: 'TRAN_AA_20260918_2M8N5P',
    valId: 'VAL_20260918_J0K1L2',
    orderId: 'ORD-20260918-004',
    customerName: 'Rafiq ul Islam',
    customerPhone: '+880 1912-456789',
    amount: 8350,
    paymentMethod: 'Rocket',
    status: 'Success',
    bankGateway: 'DBBL Rocket',
    riskLevel: 'Medium',
    createdAt: '2026-09-18T09:15:00+06:00',
    validatedAt: '2026-09-18T09:16:10+06:00',
  },
  {
    tranId: 'TRAN_AA_20260919_4T7U1V',
    valId: 'VAL_20260919_M3N4O5',
    orderId: 'ORD-20260919-005',
    customerName: 'Sabrina Akter',
    customerPhone: '+880 1823-112233',
    amount: 8880,
    paymentMethod: 'bKash',
    status: 'Success',
    bankGateway: 'bKash PGW',
    riskLevel: 'Low',
    createdAt: '2026-09-19T16:40:00+06:00',
    validatedAt: '2026-09-19T16:40:33+06:00',
  },
  {
    tranId: 'TRAN_AA_20260920_9R3S6T',
    valId: 'VAL_20260920_P6Q7R8',
    orderId: 'ORD-20260920-006',
    customerName: 'Arif Hossain',
    customerPhone: '+880 1745-998877',
    amount: 4650,
    paymentMethod: 'Nagad',
    status: 'Failed',
    bankGateway: 'Nagad PGW',
    riskLevel: 'High',
    createdAt: '2026-09-20T08:10:00+06:00',
  },
];
