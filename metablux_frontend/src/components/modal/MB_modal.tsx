import React from "react";
import Modal from "react-modal";
import styles from "./MB_modal.module.css";

export type MBModalProps = {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export const MB_Modal: React.FC<MBModalProps> = ({
  open,
  onClose,
  size = "md",
  title,
  children,
  footer,
}) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={`${styles.modal} ${styles[size]}`}
      ariaHideApp={false}
    >
      {/* HEADER */}
      <div className={styles.header}>
        <h3>{title}</h3>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* BODY */}
      <div className={styles.body}>{children}</div>

      {/* FOOTER */}
      {footer && <div className={styles.footer}>{footer}</div>}
    </Modal>
  );
};
