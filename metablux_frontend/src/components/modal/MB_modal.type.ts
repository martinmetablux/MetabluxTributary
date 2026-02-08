export type MBModalProps = {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
};