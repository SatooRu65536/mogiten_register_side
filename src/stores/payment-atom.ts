import { atom } from 'jotai';
import { moneyTypes } from '../const/money';
import { atomFamily } from 'jotai/utils';
import { orderAtom } from './order-atom';
import { itemList } from '../const/items';

export const moneyAtomFamily = atomFamily((name: string) => {
  const money = moneyTypes.find((m) => m.name === name);
  if (!money) throw new Error(`MoneyType ${name} not found`);
  return atom({ ...money, quantity: 0 });
});

export const changeMoneyAtomFamily = atomFamily((name: string) => {
  const money = moneyTypes.find((m) => m.name === name);
  if (!money) throw new Error(`MoneyType ${name} not found`);
  return atom({ ...money, quantity: 0 });
});

export const totalAtom = atom((get) => {
  const order = get(orderAtom);
  // eslint-disable-next-line unicorn/no-array-reduce
  return order.reduce((acc, curr) => {
    const price = itemList.find((item) => item.name === curr.name)?.price;
    if (price == undefined) throw new Error(`Item ${curr.name} not found`);
    return acc + price * curr.quantity;
  }, 0);
});

export const recvTotalAtom = atom((get) => {
  const payment = moneyTypes.map((m) => get(moneyAtomFamily(m.name)));
  return payment.reduce((acc, curr) => acc + curr.amount * curr.quantity, 0);
});

export const changeTotalAtom = atom((get) => {
  const total = get(totalAtom);
  const recvTotal = get(recvTotalAtom);
  return recvTotal - total;
});
