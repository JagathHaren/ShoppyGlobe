import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 const handlePlaceOrder = () => {
  dispatch(clearCart());
  navigate("/thank-you");
};

  if (cartItems.length === 0) {
    return <h2 className="text-center text-xl mt-10 text-white">Your cart is empty.</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-gray-600 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="text-sm text-white">
                ${item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 text-xl font-bold text-white">
        Total: <span className="text-blue-600">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
