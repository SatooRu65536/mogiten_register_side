import styles from './index.module.scss';
import { useAtomValue } from 'jotai';
import {
  changeTotalAtom,
  recvTotalAtom,
  totalAtom,
} from '../../stores/payment-atom';
import Money from './Money';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { moneyTypes } from '../../const/money';
import { addOrder } from '../../utils/supabase/db';
import { orderAtom, userIdAtom } from '../../stores/order-atom';

export default function Payment() {
  const navigation = useNavigate();
  const order = useAtomValue(orderAtom);
  const total = useAtomValue(totalAtom);
  const recvTotal = useAtomValue(recvTotalAtom);
  const changeTotal = useAtomValue(changeTotalAtom);
  const userId = useAtomValue(userIdAtom);

  const handleSubmit = useCallback(() => {
    if (userId == undefined) {
      alert('ユーザーIDが不正です');
      return;
    }
    (async () => {
      await addOrder(order, userId);
      alert('支払いが完了しました');
      navigation('/accounting');
    })();
  }, []);

  return (
    <main className={styles.payment}>
      <section className={styles.money}>
        <h2>受け取り</h2>
        {moneyTypes.map((money) => (
          <Money key={money.name} name={money.name} />
        ))}
      </section>

      <section className={styles.payment_info}>
        <div>
          <span>支払金額:</span>
          <span>{`${total}円`}</span>
          <span>受取金額:</span>
          <span>{`${recvTotal}円`}</span>
          <span>お釣り:</span>
          <span>{`${changeTotal}円`}</span>
        </div>
      </section>

      <section className={styles.submit_container}>
        <button onClick={handleSubmit} disabled={changeTotal < 0}>
          完了
        </button>
      </section>
    </main>
  );
}
