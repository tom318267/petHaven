import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity, setCart } from "../store/cartSlice";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (parsedCart.items && parsedCart.items.length > 0) {
        dispatch(setCart(parsedCart.items));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
    }
  }, [cartItems]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    console.log("Checkout started");
    try {
      const stripe = await stripePromise;
      console.log("Stripe loaded");

      // Log cart items to verify structure
      console.log("Cart Items:", cartItems);

      const response = await axios.post("/api/create-checkout-session", {
        items: cartItems,
      });

      console.log("Checkout session created", response.data);

      const result = await stripe!.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error in creating checkout session:", error);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    toast.success("Item removed from cart", {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#4CB944", // Green background
        color: "#ffffff", // White text
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-24 flex flex-col">
        <h1 className="text-5xl font-extrabold text-center mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <Image
              src="/images/dog.png"
              alt="Sad dog - Empty cart"
              width={200}
              height={200}
              className="mb-8 object-contain pb-6"
            />
            <p className="text-xl text-gray-600">
              Your cart is empty. Let&apos;s find something special for your
              pet!
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden my-8">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Quantity</th>
                    <th className="px-6 py-3 text-left">Total</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-6 py-4 flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="mr-4 object-cover"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: item.id.toString(),
                                quantity: Math.max(
                                  1,
                                  parseInt(e.target.value) || 0
                                ),
                              })
                            )
                          }
                          className="w-16 px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleRemoveFromCart(item.id.toString())
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-right">
              <p className="text-xl font-semibold mb-4">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="bg-[#E65000] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#CC4700] transition shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
