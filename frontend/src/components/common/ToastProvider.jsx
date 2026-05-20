import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '14px',
          background: '#0f172a',
          color: '#fff',
        },
      }}
    />
  );
}
