"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { sharePersona } from "../lib/personaUtils";

export default function ShareModal({
  isOpen,
  onClose,
  personaConfig,
  personaId,
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    try {
      setLoading(true);
      const shared = await sharePersona(personaId);
      const url = `${window.location.origin}/persona/share/${shared.share_token}`;
      setShareUrl(url);
    } catch (error) {
      console.error("Error sharing persona:", error);
      alert("Failed to generate share link");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Share link copied to clipboard!");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900"
                >
                  Share Your Persona
                </Dialog.Title>

                <div className="mt-4">
                  {!shareUrl ? (
                    <button
                      onClick={handleShare}
                      disabled={loading}
                      className={`w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-600"
                      }`}
                    >
                      {loading ? "Generating link..." : "Generate Share Link"}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          className="flex-1 p-2 text-sm border rounded-md text-gray-900 bg-gray-50"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={onClose}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
