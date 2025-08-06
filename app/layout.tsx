/* eslint-disable camelcase */

import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";


import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css'; 


import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/shared/Header";
import React from "react";
import Footer from "@/components/shared/Footer";

import { PrimeReactProvider } from 'primereact/api';

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
});

export const metadata: Metadata = {
  title: "CSC",
  description: "Clêbia Sousa Costa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{unstyled: false}}>
      <html lang="pt-BR">
      <body className={`${albertSans.variable}`}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
    </PrimeReactProvider>
    
  );
}
