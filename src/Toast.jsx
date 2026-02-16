import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import "./Toast.css";

export default function Toast({ toasts, removeToast }) {
  return (
    <AnimatePresence>
      <div className="toast-container">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.3 }}
          >
            <div className="toast-content">
              {toast.type === "success" && (
                <CheckCircle size={20} className="toast-icon" />
              )}
              {toast.type === "error" && (
                <AlertCircle size={20} className="toast-icon" />
              )}
              <span className="toast-message">{toast.message}</span>
            </div>
            {/* progress bar that shrinks from right to left */}
            <div
              className={`toast-progress toast-progress-${toast.type}`}
              style={{ animationDuration: `${toast.duration}ms` }}
            />
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
