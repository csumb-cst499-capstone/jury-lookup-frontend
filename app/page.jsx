import React from "react";
import Login from "@/components/login";
import { PageWrapper } from "./page-wrapper";

export function metadata() {
  return {
    title: "Jury Duty Lookup",
    description: "lookup your jury duty information",
    slug: "/login",
  };
}
export default function Page() {
  return (
    <PageWrapper>
      <div className="flex-auto">
        <Login />
      </div>
    </PageWrapper>
  );
}
