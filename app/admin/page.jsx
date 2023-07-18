"use client";
import React, { useState } from "react";
import { JurorLookup } from "@/components/admin/juror_lookup";
import { PageWrapper } from "../page-wrapper";
import { options } from "../api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  return (
    <PageWrapper>
      <div className="flex-auto shadow-lg px-3 max-w-full h-screen m-auto mt-4">
        <h1 className="text-3xl text-center font-bold shadow-max-sm m-5">
          Welcome, {data?.user.name}
        </h1>
        <div className="flex-auto rounded-full">
          <JurorLookup />
        </div>
      </div>
    </PageWrapper>
  );
}
