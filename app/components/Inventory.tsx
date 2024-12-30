"use client";
import { motion, AnimatePresence } from "framer-motion";

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: "quest" | "consumable" | "key" | "artifact";
  quantity: number;
  icon?: string;
}

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onUseItem?: (itemId: string) => void;
}

export default function Inventory({
  isOpen,
  onClose,
  items,
  onUseItem,
}: InventoryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0C0C0C]/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#481E14] p-6 rounded-lg border-2 border-[#F2613F] w-[600px] max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-pixel text-[#F2613F]">Inventory</h2>
              <button
                onClick={onClose}
                className="text-[#F2613F] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {items.length === 0 ? (
                <p className="text-[#9B3922] col-span-2 text-center py-4">
                  Your inventory is empty
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0C0C0C] p-4 border border-[#9B3922] hover:border-[#F2613F]
                    transition-colors rounded-lg cursor-pointer"
                    onClick={() => onUseItem?.(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#9B3922] rounded-lg flex items-center justify-center">
                        {item.icon || item.name[0]}
                      </div>
                      <div>
                        <h3 className="text-[#F2613F] font-medium">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#9B3922]">{item.type}</p>
                      </div>
                      {item.quantity > 1 && (
                        <span className="ml-auto text-[#F2613F]">
                          x{item.quantity}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
