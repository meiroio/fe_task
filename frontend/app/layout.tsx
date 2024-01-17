import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/side-bar/SideBar";
import Modal from "./_contexts/modal-context/Modal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Front-end Task - Adam Zachoval",
  description: "This is a front-end task for a job application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex bg-gray-200`}>
        <SideBar />
        {children}
      </body>
    </html>
  );
}
