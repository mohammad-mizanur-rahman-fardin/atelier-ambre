export type OrderStatus = 'Pending' | 'Processing' | 'Dispatched' | 'Delivered';
export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket' | 'Visa' | 'Mastercard';
export type PaymentStatus = 'Initiated' | 'Validating' | 'Success' | 'Failed' | 'Refunded' | 'Voided';

export type Division = 'Dhaka' | 'Chittagong' | 'Rajshahi' | 'Khulna' | 'Barisal' | 'Sylhet' | 'Rangpur' | 'Mymensingh';

export const divisions: Division[] = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];

export interface OrderItem {
  productId: string;
  productName: string;
  size: '50ml' | '100ml';
  quantity: number;
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  division: Division;
  city: string;
  address: string;
  avatar?: string;
}

export interface Order {
  id: string;
  tranId: string;
  valId: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-20260915-001',
    tranId: 'TRAN_AA_20260915_7X9K2M',
    valId: 'VAL_20260915_A1B2C3',
    customer: {
      name: 'Fahmida Rahman',
      phone: '+880 1712-345678',
      email: 'fahmida.r@gmail.com',
      division: 'Dhaka',
      city: 'Gulshan',
      address: 'House 14, Road 103, Gulshan-2, Dhaka 1212',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fahmida',
    },
    items: [
      { productId: 'oud-noir', productName: 'Oud Noir', size: '100ml', quantity: 1, unitPrice: 7800 },
      { productId: 'amber-royale', productName: 'Amber Royale', size: '50ml', quantity: 1, unitPrice: 3800 },
    ],
    subtotal: 11600,
    deliveryFee: 0,
    total: 11600,
    paymentMethod: 'bKash',
    paymentStatus: 'Success',
    orderStatus: 'Delivered',
    createdAt: '2026-09-15T10:30:00+06:00',
    updatedAt: '2026-09-17T14:00:00+06:00',
  },
  {
    id: 'ORD-20260916-002',
    tranId: 'TRAN_AA_20260916_3P5Q8R',
    valId: 'VAL_20260916_D4E5F6',
    customer: {
      name: 'Tanvir Ahmed Khan',
      phone: '+880 1898-765432',
      email: 'tanvir.khan@yahoo.com',
      division: 'Chittagong',
      city: 'Agrabad',
      address: 'Flat 5B, Green Tower, Agrabad C/A, Chittagong 4100',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir',
    },
    items: [
      { productId: 'santal-mystique', productName: 'Santal Mystique', size: '100ml', quantity: 1, unitPrice: 7200 },
    ],
    subtotal: 7200,
    deliveryFee: 150,
    total: 7350,
    paymentMethod: 'Nagad',
    paymentStatus: 'Success',
    orderStatus: 'Dispatched',
    createdAt: '2026-09-16T15:45:00+06:00',
    updatedAt: '2026-09-18T09:30:00+06:00',
  },
  {
    id: 'ORD-20260917-003',
    tranId: 'TRAN_AA_20260917_6Y1Z4W',
    valId: 'VAL_20260917_G7H8I9',
    customer: {
      name: 'Nusrat Jahan Priya',
      phone: '+880 1567-890123',
      email: 'nusrat.priya@outlook.com',
      division: 'Dhaka',
      city: 'Dhanmondi',
      address: 'House 28, Road 4, Dhanmondi R/A, Dhaka 1205',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat',
    },
    items: [
      { productId: 'rose-de-soie', productName: 'Rose de Soie', size: '50ml', quantity: 2, unitPrice: 3500 },
      { productId: 'bergamot-velvet', productName: 'Bergamot Velvet', size: '100ml', quantity: 1, unitPrice: 5500 },
    ],
    subtotal: 12500,
    deliveryFee: 0,
    total: 12500,
    paymentMethod: 'Visa',
    paymentStatus: 'Success',
    orderStatus: 'Processing',
    createdAt: '2026-09-17T11:20:00+06:00',
    updatedAt: '2026-09-17T11:20:00+06:00',
  },
  {
    id: 'ORD-20260918-004',
    tranId: 'TRAN_AA_20260918_2M8N5P',
    valId: 'VAL_20260918_J0K1L2',
    customer: {
      name: 'Rafiq ul Islam',
      phone: '+880 1912-456789',
      division: 'Sylhet',
      city: 'Zindabazar',
      address: 'Shahjalal Upashohor, Near Airport Road, Sylhet 3100',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafiq',
    },
    items: [
      { productId: 'jasmine-imperiale', productName: 'Jasmine Impériale', size: '100ml', quantity: 1, unitPrice: 8200 },
    ],
    subtotal: 8200,
    deliveryFee: 150,
    total: 8350,
    paymentMethod: 'Rocket',
    paymentStatus: 'Success',
    orderStatus: 'Pending',
    createdAt: '2026-09-18T09:15:00+06:00',
    updatedAt: '2026-09-18T09:15:00+06:00',
  },
  {
    id: 'ORD-20260919-005',
    tranId: 'TRAN_AA_20260919_4T7U1V',
    valId: 'VAL_20260919_M3N4O5',
    customer: {
      name: 'Sabrina Akter',
      phone: '+880 1823-112233',
      email: 'sabrina.akter@gmail.com',
      division: 'Dhaka',
      city: 'Banani',
      address: 'Apt 12A, City Heights, Road 11, Banani, Dhaka 1213',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sabrina',
    },
    items: [
      { productId: 'iris-platine', productName: 'Iris Platine', size: '50ml', quantity: 1, unitPrice: 5200 },
      { productId: 'vetiver-obscur', productName: 'Vetiver Obscur', size: '50ml', quantity: 1, unitPrice: 3600 },
    ],
    subtotal: 8800,
    deliveryFee: 80,
    total: 8880,
    paymentMethod: 'bKash',
    paymentStatus: 'Success',
    orderStatus: 'Processing',
    createdAt: '2026-09-19T16:40:00+06:00',
    updatedAt: '2026-09-19T16:40:00+06:00',
  },
  {
    id: 'ORD-20260920-006',
    tranId: 'TRAN_AA_20260920_9R3S6T',
    valId: 'VAL_20260920_P6Q7R8',
    customer: {
      name: 'Arif Hossain',
      phone: '+880 1745-998877',
      division: 'Rajshahi',
      city: 'Shaheb Bazaar',
      address: 'Padma Garden, Shaheb Bazaar, Rajshahi 6000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arif',
    },
    items: [
      { productId: 'oud-noir', productName: 'Oud Noir', size: '50ml', quantity: 1, unitPrice: 4500 },
    ],
    subtotal: 4500,
    deliveryFee: 150,
    total: 4650,
    paymentMethod: 'Nagad',
    paymentStatus: 'Failed',
    orderStatus: 'Pending',
    createdAt: '2026-09-20T08:10:00+06:00',
    updatedAt: '2026-09-20T08:10:00+06:00',
  },
];
