export interface Item {
  name: string;
  price: number;
  image: string;
}

export interface OrderItem extends Pick<Item, 'name'> {
  quantity: number;
}

export type ItemGroup = Record<string, Item[]>;

export interface MoneyType {
  amount: number;
  name: string;
}

export type Payment = Array<MoneyType & { quantity: number }>;
