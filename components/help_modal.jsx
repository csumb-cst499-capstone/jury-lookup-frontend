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
          <h3 className="text-2xl font-bold mb-4">
            {t("modal.instructionsTitle")}
          </h3>
          <ul>
            <li>{t("modal.instructionsStep1")}</li>
            <li>{t("modal.instructionsStep2")}</li>
            <li>{t("modal.instructionsStep3")}</li>
            <li>{t("modal.instructionsStep4")}</li>
          </ul>
          <Button
            className="mt-4 px-3 py-1 text-white bg-violet-700 shadow-violet-700 hover:bg-violet-600"
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
