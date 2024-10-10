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

export default function Payment() {
  const navigation = useNavigate();
  const total = useAtomValue(totalAtom);
  const recvTotal = useAtomValue(recvTotalAtom);
  const changeTotal = useAtomValue(changeTotalAtom);

  const handleSubmit = useCallback(() => {
    navigation('/accounting');
    alert('支払いが完了しました');
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
