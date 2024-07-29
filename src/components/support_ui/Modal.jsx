import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isDialogOpen,
  classesToBeApplied = "",
  onModalClose,
}) {
  const dialog = useRef();
  useEffect(() => {
    if (isDialogOpen) {
      dialog.current.showModal();
    }
    return () => dialog.current.close();
  }, [isDialogOpen]);
  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${classesToBeApplied}`}
      onClose={onModalClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
