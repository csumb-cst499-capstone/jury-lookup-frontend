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

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <Dropdown closeOnSelect={true}>
      <DropdownTrigger>
        <Button className="language-button" variant="light" color="primary">
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
        >
          {t("English")}
        </DropdownItem>
        <DropdownItem
          startContent={getUnicodeFlagIcon("ES")}
          onClick={() => changeLanguage("es")}
        >
          {t("Español")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
