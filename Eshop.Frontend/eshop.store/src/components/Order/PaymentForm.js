import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../api/ShoppingCartApiService";
import OrderApiService from "../../api/OrderApiService";
import OrderSuccess from "./OrderSuccess";

import "./style.css";

const PaymentForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);
  const orderApi = new OrderApiService(axiosPrivate);

  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();

  //   const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await cartApi.getUserCart();
        // setCart(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    addMessage("Creating payment intent...");

    try {
      const response = await orderApi.createPaymentIntent();
      const clientSecret = response.data.clientSecret;
      addMessage("Payment intent created");

      // Confirm payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
      if (stripeError) {
        addMessage("Stripe error: " + stripeError.message);
        return;
      }

      addMessage(
        `Payment intent (${paymentIntent.id}): ${paymentIntent.status}`
      );

      setPaymentSuccess(true);
    } catch (error) {
      console.log(error);
      addMessage("Server error");
      addMessage(error.response.message);
    }
  };

  if (isLoading) return <h5>Loading...</h5>;

  return paymentSuccess ? (
    <OrderSuccess />
  ) : (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">
          <h5>Card</h5>
        </label>
        <CardElement id="card" />

        <button type="submit" className="btn btn-primary">
          Pay
        </button>
      </form>
      <StatusMessages messages={messages} />
    </>
  );
};

export default PaymentForm;
