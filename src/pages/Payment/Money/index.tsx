import styles from './index.module.scss';
import { useAtom } from 'jotai';
import { moneyAtomFamily } from '../../../stores/payment-atom';
import { useCallback } from 'react';

interface Props {
  name: string;
}

export default function Money({ name }: Props) {
  const [{ quantity }, setMoney] = useAtom(moneyAtomFamily(name));

  const handleIncrement = useCallback((amount: number) => {
    setMoney((prev) => ({ ...prev, quantity: prev.quantity + amount }));
  }, []);

  return (
    <div className={styles.money}>
      <h3>{name}</h3>

      <div className={styles.actions}>
        <button onClick={() => handleIncrement(-5)} disabled={quantity < 0 + 5}>
          -5
        </button>
        <button onClick={() => handleIncrement(-1)} disabled={quantity <= 0}>
          -1
        </button>
        <span>{quantity}</span>
        <button onClick={() => handleIncrement(1)} disabled={quantity >= 20}>
          +1
        </button>
        <button onClick={() => handleIncrement(5)} disabled={quantity > 20 - 5}>
          +5
        </button>
      </div>
    </div>
  );
}
