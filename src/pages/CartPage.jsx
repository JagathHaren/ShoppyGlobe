import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <h2 className="text-center text-xl mt-10 text-white">Your cart is empty.</h2>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow border-2 border-white bg-gray-600"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-cover rounded bg-gray-600"
            />
            <div className="">
              <h3 className="font-semibold text-lg text-white">{item.title}</h3>
              <p className="text-white">${item.price}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 sm:mt-0 space-x-2 ">
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-white">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
            <button
              onClick={() => handleRemove(item.id)}
              className="ml-4 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <Link
        to="/checkout"
        className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </Link>
      <div className="text-right mt-6">
        <p className="text-xl font-semibold">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default Cart;
