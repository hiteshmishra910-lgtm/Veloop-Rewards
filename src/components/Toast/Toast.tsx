import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-3.5 bg-[#1e2338] border border-slate-700/80 rounded-xl shadow-xl flex items-start gap-3 text-slate-100 animate-slideUp"
          role="status"
        >
          <div className="text-emerald-400 mt-0.5 shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white">{toast.title}</h5>
            {toast.description && (
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
