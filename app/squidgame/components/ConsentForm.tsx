"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsentFormProps {
  onClose: () => void;
}

export default function ConsentForm({ onClose }: ConsentFormProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [playerNumber, setPlayerNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isChecked && playerNumber) {
      setIsSubmitting(true);

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // You can add your form submission logic here
      console.log("Consent given, player number:", playerNumber);

      // Close the form with a slight delay for better UX
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="consent-form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-pink-500"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="consent-form">
          <div className="form-header">
            <div className="form-stamp">CONFIDENTIAL</div>
            <h2 className="text-2xl font-bold text-white">
              Player Consent Form
            </h2>
            <div className="form-number">Form: SG-2024</div>
          </div>

          <div className="form-content">
            <p className="warning">WARNING: READ CAREFULLY BEFORE SIGNING</p>

            <div className="terms">
              <p>
                I, the undersigned, hereby acknowledge and agree to the
                following terms:
              </p>

              <ol>
                <li>I enter this game of my own free will.</li>
                <li>
                  I understand that elimination from the game is permanent.
                </li>
                <li>
                  I agree to complete all assigned tasks without question.
                </li>
                <li>
                  I accept that failure to comply with game rules will result in
                  immediate elimination.
                </li>
                <li>I waive all rights to contest the game&apos;s outcome.</li>
              </ol>
            </div>

            <form onSubmit={handleSubmit} className="form-fields">
              <div className="input-group">
                <label htmlFor="playerNumber">Assigned Player Number:</label>
                <input
                  type="text"
                  id="playerNumber"
                  value={playerNumber}
                  onChange={(e) => setPlayerNumber(e.target.value)}
                  placeholder="Enter number"
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="consent-checkbox">
                <input
                  type="checkbox"
                  id="consent"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required
                  disabled={isSubmitting}
                />
                <label htmlFor="consent">
                  I have read and fully understand the terms above
                </label>
              </div>

              <button
                type="submit"
                className="consent-submit-btn"
                disabled={!isChecked || !playerNumber || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Accept & Enter"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
