import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastContainer } from './components/UI';
import { useToast } from './hooks/useToast';

const AppWithToast = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <>
      <App />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithToast />
  </StrictMode>
);
