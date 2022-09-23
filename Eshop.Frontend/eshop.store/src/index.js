import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./Context/AuthProvider";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/js/src/collapse.js";
import "./index.css";

import "./index.css";

const publishableKey =
  "pk_test_51LID49Dd7uITjcZnlyE1fPEx9J4LX9VxuiRTJQliX0Oo3Vj2hSVyqJ6gLKqNPU3Amwez3CzjFdsC87cb6oCwb3ft00GRQ15QRx";
const stripePromise = loadStripe(publishableKey);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Elements>
  </>
);
