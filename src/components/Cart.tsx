import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { RootState } from "../store";
import { CartItem } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item: CartItem) => (
        <div key={item.id}>
          {item.name} - Quantity: {item.quantity}
          <button
            onClick={() => dispatch(removeFromCart(item.id.toString()))}
            className="bg-blue-800 text-white px-2 py-1 rounded ml-2 hover:bg-blue-700"
          >
            Remove
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  id: item.id.toString(),
                  quantity: parseInt(e.target.value),
                })
              )
            }
            className="ml-2 w-16 px-2 py-1 border rounded"
          />
        </div>
      ))}
      <button
        onClick={() => dispatch(clearCart())}
        className="bg-blue-800 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
