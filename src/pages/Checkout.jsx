import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservation = location.state?.reservation || null;

  const proceed = () => {
    navigate("/payment", { state: { reservation } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your Reservation
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full  shadow-sm">
          {reservation ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type</span>
                <span className="font-semibold text-gray-900">
                  {reservation.roomType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">
                  {reservation.checkIn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">
                  {reservation.checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold text-gray-900">
                  {reservation.guests}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-600">
              No reservation details provided.
            </div>
          )}
        </div>

        <button
          onClick={proceed}
          disabled={!reservation}
          className={`mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg ${
            reservation ? "" : "opacity-60 cursor-not-allowed"
          }`}
        >
          Continue to Payment
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Checkout;
