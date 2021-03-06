export interface User {
  name: string;
  email: string;
  displayName: string | null;
  orders: { amount: string; date: string; flavour: string }[];
}
