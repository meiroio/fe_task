"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import AttributesLayoute from "../_components/atributes-layoute/AttributesLayoute";
import { ModalProvider } from "../_components/modals/useModal";

export default function Attributes() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <main className=" self-center  gap-12 flex min-h-screen flex-col items-top w-[80vw] bg-gray-100 ">
          <AttributesLayoute />
        </main>
      </ModalProvider>
    </QueryClientProvider>
  );
}
