"use client";
import React, { useState } from "react";
import { JurorLookup } from "@/components/admin/juror_lookup";
import { PageWrapper } from "../page-wrapper";

export default function Page() {
  return (
    <PageWrapper>
      <div className="flex-auto shadow-lg px-3 max-w-full h-screen m-auto mt-4">
      <div className="divider"></div>
        <h1 className="text-3xl text-center font-bold shadow-max-sm m-5">
          Welcome Jury Duty Admin
        </h1>
        <div className="flex-auto rounded-full">
          <JurorLookup />
        </div>
      </div>
    </PageWrapper>
  );
}
