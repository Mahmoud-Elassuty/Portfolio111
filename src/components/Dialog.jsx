import { useEffect, useRef } from 'react';

/** Accessible modal built on the native <dialog>: focus trap, Esc to close, focus restored on close. */
export default function Dialog({ onClose, labelledBy, children, closeLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    const trigger = document.activeElement; // remember what opened the dialog
    if (!d.open) d.showModal();
    document.documentElement.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
      if (d.open) d.close();
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true }); // restore focus for keyboard / screen-reader users
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="dlg"
      aria-labelledby={labelledBy}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onMouseDown={(e) => { if (e.target === ref.current) onClose(); }} // click on the backdrop
    >
      <div className="dlg__scroll">
        <button type="button" className="dlg__close" onClick={onClose} aria-label={closeLabel}>
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
