import { data } from "react-router-dom";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
const api = import.meta.env.VITE_BACKEND_URL;

export const handlePayment = async (
  currentData,
  page,
  url,
  amount,
  userId,
  databaseT,
  updatedId
) => {
  //console.log(currentData, amount, userId, databaseT, updatedId, "ff");

  // Step 1: Create Razorpay Order
  const res = await fetch(`${api}/api/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const order = await res.json();
  console.log(order);

  // Step 2: Open Razorpay checkout
  const options = {
    key: razorpayKey,
    amount: order.amount,
    currency: order.currency,
    name: "Reparv",
    description: `${page} Registration`,
    order_id: order.id,
    handler: async (response) => {
      // Step 3: On Payment Success - verify & save
      const verifyRes = await fetch(`${api}/api/payment/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedId: updatedId,
          database: databaseT,
          user_id: userId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          student_id: currentData.email, // use unique field as student ID
          amount,
          role: page,
          url: url
        }),
      });

      const result = await verifyRes.json();

      if (result.success) {
        console.log(result);

        alert("Payment Successful!");
      } else {
        alert("Payment verification failed!");
      }
    },
    prefill: {
      name: currentData?.fullname,
      email: currentData?.email,
      contact: currentData?.contact,
    },
    theme: {
      color: "#28a745",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
