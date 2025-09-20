import React, { useState } from "react";
import { motion } from "framer-motion";

const Paymentpage = ({ booking }) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paid, setPaid] = useState(false);

  // ✅ Fallback booking (so it won't crash if undefined)
  const bookingData = booking || {
    coach_name: "Sample Coach",
    date: "2025-09-01",
    time: "2:00 PM",
    venue: "Barangay Gymnasium",
    price: 500,
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bookingData.price * 100, // PayMongo uses cents
          description: `Session with ${bookingData.coach_name}`,
        }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        setPaymentUrl(data.checkout_url);
        window.location.href = data.checkout_url; // redirect user to PayMongo Checkout
      } else if (data.success) {
        // ✅ In case your backend confirms payment immediately
        setPaid(true);
      }
    } catch (error) {
      console.error("❌ Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto"
    >
      <h1 className="text-xl font-bold mb-4 border-b pb-2">Checkout</h1>

      {/* Booking Summary */}
      <div className="mb-4">
        <p><strong>Coach:</strong> {bookingData.coach_name}</p>
        <p><strong>Date:</strong> {bookingData.date}</p>
        <p><strong>Time:</strong> {bookingData.time}</p>
        <p><strong>Venue:</strong> {bookingData.venue}</p>
        <p className="text-lg font-semibold text-green-700 mt-2">
          ₱{bookingData.price}
        </p>
      </div>

      {/* Payment Options */}
      <div className="mb-4">
        <p className="font-semibold">Payment Options:</p>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          <li>GCash</li>
          <li>Credit/Debit Card</li>
          <li>GrabPay</li>
        </ul>
      </div>

      {/* Pay Button */}
      {!paid && (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      )}

      {/* Confirmation */}
      {paid && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          ✅ Payment Successful!  
          <br />
          <a
            href="/receipt.pdf"
            download
            className="text-blue-600 underline mt-2 inline-block"
          >
            Download Receipt
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default Paymentpage;
