import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Home from './pages/Home';
import { Provider } from 'jotai';
import Header from './components/Header';
import Payment from './pages/Payment';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Provider>
      <Header />
      <BrowserRouter>
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
          <Route path={'/'} element={<Home />} />
          <Route path={'/accounting/payment'} element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
