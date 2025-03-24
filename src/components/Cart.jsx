import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty 😞</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-900 font-semibold">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded"
            onClick={() => alert("Proceeding to Checkout...")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
