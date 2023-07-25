// "use client";

// import Login from "@/components/login";
// import { PageWrapper } from "./page-wrapper";

// export default function Page() {
//   return (
//     <PageWrapper>
//       <div className="flex-auto">
//         <Login />
//       </div>
//     </PageWrapper>
//   );
// }


 "use client";
import React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import Login from "@/components/login";
import { PageWrapper } from "./page-wrapper";

export default function Page() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <PageWrapper>
        <div className="flex-auto">
          <Login />

          <div className="language-buttons">
            <button
              className="language-button"
              onClick={() => changeLanguage("en")}
            >
              &nbsp;
              {t("English(US)")} 
              &nbsp;
            </button>
            <button
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
