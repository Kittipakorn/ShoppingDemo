// app/components/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-5 rounded-lg z-10">
        {children}
        <h1 className="text-center">Kasikorn Bank</h1>
        <h1 className="text-center">กิตติปกรณ์ สีนาค</h1>
      </div>
    </div>
  );
};

export default Modal;
