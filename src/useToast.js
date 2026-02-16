import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  // default duration is 5000ms (5 seconds) as requested
  const addToast = useCallback((message, type = "success", duration = 5000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => addToast(message, "success", duration),
    [addToast]
  );

  const error = useCallback(
    (message, duration) => addToast(message, "error", duration),
    [addToast]
  );

  return { toasts, addToast, removeToast, success, error };
}
