import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

// Page 3: Success
const SuccessPage = () => {
  const location = useLocation();
  const cardData = location.state || {};

  const [showConfetti, setShowConfetti] = useState(true);
  const bookingId = `PR${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Credit Card Online Payments
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto px-6 pt-4 w-full">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-green-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-green-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-green-600 rounded-full"></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">Payment</span>
          <span className="text-xs text-gray-400">Verify</span>
          <span className="text-xs font-medium text-green-600">Complete</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          {/* Success Animation */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
              {showConfetti && (
                <>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  <div
                    className="absolute top-4 right-0 w-2 h-2 bg-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="absolute bottom-4 left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <div
                    className="absolute bottom-0 right-4 w-3 h-3 bg-purple-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </>
              )}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            🎉 Your payment was successful
          </p>
          <p className="text-sm text-green-600 font-semibold mb-8">
            Get ready for an amazing stay!
          </p>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-left">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
              <span className="text-sm text-gray-600">Booking Reference</span>
              <span className="font-bold text-lg text-gray-900">
                #{bookingId}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Room Type</span>
                <span className="font-semibold text-gray-900">
                  {cardData.reservation?.roomType || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">
                  {cardData.reservation?.checkIn || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">
                  {cardData.reservation?.checkOut || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold text-gray-900">
                  {cardData.reservation?.guests ?? "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              📧 Confirmation email sent to your registered email
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              View Booking Details
            </button>
            <button className="w-full bg-white hover:bg-gray-50 active:scale-95 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 border-2 border-gray-200 text-lg">
              Download Receipt
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            Need help? Contact us at support@paradiseresort.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
