import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Modal({ closeModal }) {
  const { t } = useTranslation(); 

  return (
    <motion.div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">{t("modal.instructionsTitle")}</h3>
          <p>
            {t("modal.instructionsStep1")}
            <br />
            {t("modal.instructionsStep2")}
            <br />
            {t("modal.instructionsStep3")}
            <br />
            {t("modal.instructionsStep4")}
          </p>
          <Button
            className="mt-4 text-sm px-3 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-300"
            onPress={closeModal}
          >
            {t("modal.closeButton")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
