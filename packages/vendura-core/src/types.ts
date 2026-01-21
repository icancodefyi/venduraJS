export type ID = string;

export type Money = {
  amount: number;
  currency: string;
};

export type CartItem = {
  productId: ID;
  quantity: number;
  price: Money;
};

export type Cart = {
  id: ID;
  items: CartItem[];
  total: Money;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderState =
  | "CREATED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED";

export type Order = {
  id: ID;
  cartId: ID;
  items: CartItem[];
  total: Money;
  state: OrderState;
  razorpayOrderId?: string;
  createdAt: Date;
};
