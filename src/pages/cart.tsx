import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import Image from "next/image";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <Image
              src="/empty-cart.png"
              alt="Empty cart"
              width={200}
              height={200}
              className="mb-8"
            />
            <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
            <p className="text-gray-600">
              Your cart is as empty as a desert mirage!
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
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
                      <td className="px-6 py-4">{item.name}</td>
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
                            dispatch(removeFromCart(item.id.toString()))
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
              <p className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
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
