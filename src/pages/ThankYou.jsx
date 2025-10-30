import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You for Your Purchase!</h2>
      <p className="text-teal-600 mb-6">
        Your order has been placed successfully. We hope to see you again soon!
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
