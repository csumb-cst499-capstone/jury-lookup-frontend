import React from "react";
import LanguageSelector from "@/components/language_selector";
import Login from "@/components/login";
import { PageWrapper } from "./page-wrapper";

export default function Page() {
  return (
    <PageWrapper>
      <div className="flex-auto">
        <Login />
      </div>
    </PageWrapper>
  );
}
