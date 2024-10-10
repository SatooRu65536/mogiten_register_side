import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

export default function Home() {
  return (
    <main className={styles.home}>
      {routes.map((r) => (
        <Link key={r.path} to={r.path}>
          {r.name}
        </Link>
      ))}
    </main>
  );
}
