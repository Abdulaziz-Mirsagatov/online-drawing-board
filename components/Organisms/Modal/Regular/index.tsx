"use client";

import { RegularModalProps } from "./types";

const RegularModal = ({ children, isOpen, onClose }: RegularModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0  overflow-hidden flex justify-center items-center z-20">
      <div className="p-4 rounded-xl bg-light z-20">{children}</div>
      <div className="fixed bg-dark/90 left-0 top-0 right-0 bottom-0 z-10"></div>
    </div>
  );
};
    
export default RegularModal;
