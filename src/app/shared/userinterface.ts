export interface Userinterface {
  // uid: string;
  name: string;
  email: string;
  displayName: string | null;
  orders: {amount: string, flavour: string}[];
}
