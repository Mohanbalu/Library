import { X } from 'lucide-react';

export default function Modal({ open, title, children, onClose, width = 'max-w-2xl' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className={`w-full ${width} rounded-3xl bg-white p-6 shadow-soft`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
