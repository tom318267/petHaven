import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../store";
import { removeFromCart, updateQuantity, setCart } from "../store/cartSlice";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { toastOptions } from "../components/GlobalToaster";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Clear any existing toasts when the cart page loads
    toast.dismiss();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (parsedCart.items && parsedCart.items.length > 0) {
        dispatch(setCart(parsedCart.items));
      }
    }

    // Set up a route change start listener
    const handleRouteChangeStart = () => {
      toast.dismiss();
    };

    // Add the listener
    router.events.on("routeChangeStart", handleRouteChangeStart);

    // Clean up
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [dispatch, router]);

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

  const handleRemoveFromCart = useCallback(
    (itemId: string) => {
      dispatch(removeFromCart(itemId));
      toast.success("Item removed from cart", toastOptions);
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-6">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-start pt-4 sm:pt-8">
            <Image
              src="/images/dog.png"
              alt="Sad dog - Empty cart"
              width={150}
              height={150}
              className="mb-2 sm:mb-4 object-contain w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]"
            />
            <p className="text-lg sm:text-xl text-gray-600 text-center">
              Your cart is empty. Let&apos;s find something special for your
              pet!
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden my-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white hidden sm:table-header-group">
                    <tr>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Quantity</th>
                      <th className="px-4 py-3 text-left">Total</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="block sm:table-row border-b sm:border-b-0"
                      >
                        <td className="p-4 sm:p-4 flex flex-col sm:table-cell sm:align-middle">
                          <div className="flex items-center justify-between mb-2 sm:mb-0">
                            <div className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="mr-4 object-cover"
                              />
                              <span className="text-sm sm:text-base font-medium">
                                {item.name}
                              </span>
                            </div>
                            <span className="sm:hidden text-sm font-semibold">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center sm:hidden mt-2">
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Qty:</span>
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
                                className="w-16 px-2 py-1 border rounded text-sm"
                              />
                            </div>
                            <span className="text-sm font-semibold">
                              Total: ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-4 py-4 text-sm sm:text-base">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="hidden sm:table-cell px-4 py-4">
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
                            className="w-16 px-2 py-1 border rounded text-sm sm:text-base"
                          />
                        </td>
                        <td className="hidden sm:table-cell px-4 py-4 text-sm sm:text-base">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-right sm:text-left">
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item.id.toString())
                            }
                            className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
