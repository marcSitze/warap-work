"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ToastContainer } from "react-toastify";
import { LoaderProvider } from "../contexts/loader/LoaderProvider";
import Loader from "../components/Loader/Loader";
import { LoadingBarContainer } from "react-top-loading-bar";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoadingBarContainer>
          <LoaderProvider>
            <Loader />
            <div className="min-h-screen bg-background">{children}</div>
          </LoaderProvider>
        </LoadingBarContainer>
      </QueryClientProvider>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Providers;
