import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Navbar from "./components/Navbar.tsx";
import ToastContextProvider from "./contexts/ToastContext.tsx";
import { RecoilRoot } from "recoil";
import Router from "./router/Router.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ToastContextProvider>
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <Router />
            </QueryClientProvider>
          </QueryParamProvider>
        </BrowserRouter>
      </ToastContextProvider>
    </RecoilRoot>
  </React.StrictMode>
);
