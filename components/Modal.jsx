import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
function Modal({ closeModal }) {
  return (
    <motion.div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Instructions for Sign In</h3>
          <p>
            Cannot Sign In? Follow these steps:
            <br />
            1. Enter your badge number in the "Badge Number" field.
            <br />
            2. Enter your pin code in the "Pin Code" field.
            <br />
            3. Click on the "Sign In" button.
            <br />
            If you still have trouble signing in, please call our office for
            assistance.
          </p>
          <Button
            className="mt-4 text-sm px-3 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-300"
            onPress={closeModal}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
