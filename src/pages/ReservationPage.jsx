import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!roomType.trim()) next.roomType = "Room type is required";
    if (!checkIn) next.checkIn = "Check-in date is required";
    if (!checkOut) next.checkOut = "Check-out date is required";
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn))
      next.checkOut = "Check-out must be after check-in";
    const n = parseInt(guests, 10);
    if (!n || n < 1) next.guests = "Enter number of guests";
    const a = parseFloat(amount);
    if (!a || a <= 0) next.amount = "Enter a valid payment amount";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const proceed = () => {
    if (!validate()) return;
    const reservation = {
      roomType,
      checkIn,
      checkOut,
      guests: parseInt(guests, 10),
      amount: parseFloat(amount),
    };
    navigate("/checkout", { state: { reservation } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Credit Card Online Payments
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reservation Details
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Enter your booking information
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Type
              </label>
              <input
                type="text"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="e.g., Deluxe Ocean View Suite"
                className={`w-full px-4 py-4 bg-white border-2 ${
                  errors.roomType
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              {errors.roomType && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.roomType}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className={`w-full px-4 py-4 bg-white border-2 ${
                    errors.checkIn
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
                />
                {errors.checkIn && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {errors.checkIn}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={`w-full px-4 py-4 bg-white border-2 ${
                    errors.checkOut
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
                />
                {errors.checkOut && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {errors.checkOut}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="e.g., 2"
                min="1"
                className={`w-full px-4 py-4 bg-white border-2 ${
                  errors.guests
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              {errors.guests && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.guests}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Amount (PHP)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 899.00"
                min="0"
                step="0.01"
                className={`w-full px-4 py-4 bg-white border-2 ${
                  errors.amount
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.amount}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={proceed}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
