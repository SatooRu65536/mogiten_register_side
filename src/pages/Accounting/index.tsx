import styles from './index.module.scss';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useAtom, useSetAtom } from 'jotai';
import { orderAtom, userIdAtom } from '../../stores/order-atom';
import destr from 'destr';
import { zOrder } from '../../schema/order';
import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

export default function Accounting() {
  const navigation = useNavigate();
  const [order, setOrder] = useAtom(orderAtom);
  const setUserId = useSetAtom(userIdAtom);

  const handleSubmit = useCallback(() => {
    navigation('/accounting/payment');
  }, []);

  const handleScan = (results: IDetectedBarcode[]) => {
    if (results[0].rawValue === '') return;
    const res = zOrder.safeParse(destr(results[0].rawValue));
    if (!res.success) {
      alert('内容が不正です');
      return;
    }

    setUserId(res.data.key);
    setOrder(res.data.order);
  };

  const tracker = (
    detectedCodes: IDetectedBarcode[],
    ctx: CanvasRenderingContext2D,
  ) => {
    for (const code of detectedCodes) {
      // 検出されたコードの周りに赤い枠を描画
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        code.boundingBox.x,
        code.boundingBox.y,
        code.boundingBox.width,
        code.boundingBox.height,
      );
    }
  };

  useEffect(() => {
    setOrder([]);
  }, []);

  return (
    <main className={styles.accounting}>
      <section className={styles.scanner_container}>
        <div className={styles.scanner}>
          <Scanner
            onScan={handleScan}
            formats={['qr_code']}
            components={{ tracker, finder: false }}
          />
        </div>
      </section>

      <section className={styles.order_container}>
        <h2>注文情報</h2>
        <OrderList order={order} />
      </section>

      <section className={styles.submit_container}>
        <button onClick={handleSubmit} disabled={order.length === 0}>
          確認
        </button>
      </section>
    </main>
  );
}
