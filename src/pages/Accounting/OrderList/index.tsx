import styles from './index.module.scss';
import { OrderItem } from '../../../types';

interface Props {
  order: OrderItem[];
}

export default function OrderList({ order }: Props) {
  return (
    <div className={styles.order_list}>
      {order.map((item) => (
        <div key={item.name} className={styles.item}>
          <span>{item.name}</span>
          <span>{item.quantity}個</span>
        </div>
      ))}
    </div>
  );
}
