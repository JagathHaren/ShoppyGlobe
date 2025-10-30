import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { House, ShoppingCart  } from 'lucide-react';
const Header = () => {
  const cartCount = useSelector(state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0))
  return (
    <header className="bg-gray-400 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-white flex gap-2 items-center">
          <img src="/logo.svg" alt="logo" width={40} height={40} /><span><b>Shoppy Globe</b></span>
        </Link>
        <nav className="space-x-4 flex">
          <Link to="/" className="text-white hover:text-blue-500"><House/></Link>
          <Link to="/cart" className="relative text-white hover:text-blue-500 flex gap-2 ">
            <ShoppingCart/>
            {cartCount > 0 && (
              <span className="ml-1 absolute bg-red-600 text-white text-xs px-2 py-0.5 rounded-full bottom-4 left-2">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
