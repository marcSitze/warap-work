"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </QueryClientProvider>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Providers;
