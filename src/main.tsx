import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Home from './pages/Home';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        {routes.map((r) => (
          <Route path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
