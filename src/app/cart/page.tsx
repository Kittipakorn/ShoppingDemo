"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import generatePayload from 'promptpay-qr';
import qrcode from 'qrcode';
import Modal from "../components/Modal";
import Link from "next/link";

export default function CartPage() {
  const { cart, getTotal } = useCart();

  //paymants
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePaymentClick = () => {
    const mobileNumber = "0987824363";
    const totalAmount = getTotal();
    const payload = generatePayload(mobileNumber, { amount: totalAmount });

    qrcode.toDataURL(payload, { errorCorrectionLevel: "H" }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrCode(url);
      setShowModal(true);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQrCode(null);
  };

  return (
    <div>
      <div className="bg-slate-200 min-h-[100vh]">
        <Link href="/">
        <div className="pl-5 pt-5">
         <svg className="w-10" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
        </div>
        </Link>
        <h1 className="text-center p-5 font-bold text-4xl">Your cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-rows gap-4 p-10">
            {cart.map((item) => (
              <div className="flex gap-5 bg-white rounded-lg p-5">
                <img src={item.image} alt={item.title} className="w-24 object-contain" />
                <div>
                  <h1>{item.title}</h1>
                  <p>10 ฿</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <h1 className="font-bold text-2xl ml-auto my-auto pr-10">{item.quantity * 10} ฿</h1>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-slate-400">
        <div className="flex p-10 gap-5">
          <h1 className="font-bold text-xl text-right ml-auto my-auto">Total : {getTotal()} ฿</h1>
          <div className="p-3 bg-black rounded-lg hover:cursor-pointer hover:bg-slate-700" onClick={handlePaymentClick}>
            <h1 className="text-white">Payment</h1>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {qrCode && <img src={qrCode} alt="QR Code for Payment" />}
      </Modal>
    </div>
  );
}
