import styles from './index.module.scss';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useAtom } from 'jotai';
import { orderAtom } from '../../stores/order-atom';
import destr from 'destr';
import { zOrder } from '../../schema/order';
import OrderList from './OrderList';
import { Link } from 'react-router-dom';

export default function Accounting() {
  const [order, setOrder] = useAtom(orderAtom);

  const handleScan = (results: IDetectedBarcode[]) => {
    console.log(results[0].rawValue);
    const res = zOrder.safeParse(destr(results[0].rawValue));
    if (!res.success) {
      alert('内容が不正です');
      return;
    }

    setOrder(res.data);
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
        <Link to="/accounting/payment">確認</Link>
      </section>
    </main>
  );
}
