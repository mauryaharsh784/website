import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-forest-dark/70 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
        style={{ animationDuration: "0.2s" }}
      />
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-surface p-7 shadow-2xl animate-fade-up"
        style={{ animationDuration: "0.3s" }}
      >
        <div className="flex items-start justify-between gap-4">
          {title && <h3 className="font-display text-xl font-semibold text-heading">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel text-ink/60 transition-colors hover:bg-forest hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
