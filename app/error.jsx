"use client";

import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { FaRegSadTear } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    // Attempt to recover by trying to re-render the segment
    reset();
  };

  return (
    <div className="h-screen bg-cyan-950 flex justify-center items-center mx-auto p-4">
      <div className="rounded-lg shadow-large bg-zinc-200 font-bold container mx-auto">
        <h1 className="text-red-600 font-bold flex mb-8 mt-4 justify-center text-lg">
          Something went wrong!
        </h1>

        <p className="text-center mb-8">
          <strong>Error:</strong> {error.message}
        </p>
        <div className="flex mx-auto justify-center">
          <Button className="mb-8" onPress={handleRetry}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
