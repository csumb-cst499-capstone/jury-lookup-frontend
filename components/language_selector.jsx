"use client";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <Dropdown closeOnSelect={true}>
      <DropdownTrigger>
        <Button
          variant="flat"
          aria-label={
            selectedLanguage === "en"
              ? t("Select English Language")
              : t("Select Spanish Language")
          }
        >
          {selectedLanguage === "en"
            ? getUnicodeFlagIcon("US")
            : getUnicodeFlagIcon("ES")}
          {selectedLanguage === "en" ? t("English") : t("Español")}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          startContent={getUnicodeFlagIcon("US")}
          onClick={() => changeLanguage("en")}
          aria-label={t("Select English Language")}
        >
          {t("English")}
        </DropdownItem>
        <DropdownItem
          startContent={getUnicodeFlagIcon("ES")}
          onClick={() => changeLanguage("es")}
          aria-label={t("Select Spanish Language")}
        >
          {t("Español")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default LanguageSelector;
