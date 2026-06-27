"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ToastKind = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  kind?: ToastKind;
  action?: {
    label: string;
    href: string;
  };
};

type ToastItem = ToastInput & {
  id: string;
  kind: ToastKind;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_DURATION_MS = 2600;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [{ id, kind: toast.kind ?? "info", ...toast }, ...current].slice(0, 3));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 z-[70] flex flex-col gap-2 sm:left-auto sm:w-[360px]" role="status" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss, paused]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="animate-fade-up rounded-3xl border border-white/10 bg-graphite p-4 text-paper shadow-[0_24px_80px_-32px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${toast.kind === "error" ? "bg-cat-energy" : toast.kind === "success" ? "bg-cat-calm" : "bg-paper"}`} />
            <p className="font-display text-base lowercase leading-tight">{toast.title}</p>
          </div>
          {toast.description ? <p className="mt-2 text-sm leading-5 text-paper/58">{toast.description}</p> : null}
        </div>
        <button type="button" onClick={onDismiss} className="tap rounded-full px-2 text-paper/55 hover:text-paper" aria-label="Dismiss notification">
          x
        </button>
      </div>
      {toast.action ? (
        <Link href={toast.action.href} onClick={onDismiss} className="pill-glass tap mt-4 !px-3 !py-2">
          {toast.action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
