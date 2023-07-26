"use client";

import React, { useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import Login from "@/components/login";
import { PageWrapper } from "./page-wrapper";

export default function Page() {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <PageWrapper>
        <div className="flex-auto">
          <Login />

          <div className="language-buttons">
            <button
              style={{              
                color: selectedLanguage === "en" ? "blue" : "black",
              }}
              className="language-button"
              onClick={() => changeLanguage("en")}
            >
              &nbsp;
              {t("English(US)")}
              &nbsp;
            </button>
            <button
              style={{ 
                color: selectedLanguage === "es" ? "blue" : "black",
              }}
              className="language-button"
              onClick={() => changeLanguage("es")}
            >
              {t("Español")}
            </button>
          </div>
        </div>
      </PageWrapper>
    </I18nextProvider>
  );
}
