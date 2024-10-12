import styles from './index.module.scss';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useSetAtom } from 'jotai';
import { userIdAtom } from '../../stores/order-atom';
import destr from 'destr';
import { zOrder } from '../../schema/order';
import { useState } from 'react';
import { itemGroup, itemList } from '../../const/items';

export default function Accounting() {
  const setUserId = useSetAtom(userIdAtom);
  const [order, setOrder] = useState('');
  const [total, setTotal] = useState(0);
  const [drinks, setDrinks] = useState('');

  const handleScan = (results: IDetectedBarcode[]) => {
    if (results[0].rawValue === '') return;
    const res = zOrder.safeParse(destr(results[0].rawValue));
    if (!res.success) {
      alert('内容が不正です');
      return;
    }

    setUserId(res.data.key);
    setOrder(
      res.data.order
        .filter(({ name }) => itemGroup.drink.every((d) => d.name !== name))
        .map(({ name, quantity }) => `${name}: ${quantity}`)
        .join('\n'),
    );
    setDrinks(
      res.data.order
        .filter(({ name }) => itemGroup.drink.some((d) => d.name === name))
        .map(({ name, quantity }) => `${name}: ${quantity}`)
        .join('\n'),
    );
    console.log(
      res.data.order
        .filter(({ name }) => itemGroup.drink.some((d) => d.name === name))
        .map(({ name, quantity }) => `${name}: ${quantity}`)
        .join('\n'),
    );

    // eslint-disable-next-line unicorn/no-array-reduce
    const total_ = res.data.order.reduce((acc, { name, quantity }) => {
      const price = itemList.find((item) => item.name === name)?.price;
      if (price === undefined) return acc;
      return acc + price * quantity;
    }, 0);
    setTotal(total_);
  };

  const copy = () => {
    navigator.clipboard.writeText(order).then(
      () => {
        alert('コピー成功👍');
      },
      () => {
        alert('コピー失敗😭');
      },
    );
  };

  return (
    <main className={styles.accounting}>
      <section className={styles.scanner_container}>
        <div className={styles.scanner}>
          <Scanner
            onScan={handleScan}
            formats={['qr_code']}
            components={{ finder: false }}
          />
        </div>
      </section>

      <section className={styles.order_container}>
        <h2>注文情報: {total}円</h2>
        <button onClick={copy}>コピー</button>
        <textarea defaultValue={order} className={styles.textarea}></textarea>
        <p className={styles.drink}>{drinks}</p>
      </section>
    </main>
  );
}
