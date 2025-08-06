import React from "react";
import PreFooter from "@/components/shared/PreFooter";
import { Metadata } from "next";
import Calculadora from "@/components/calculo-atualizacao/Calculadora";

export const metadata: Metadata = {
  title: "Cálculo de atualização monetária",
  description: "CSC - Cálculo de atualização monetária",
};

const page = () => {
  return (
    <>
      <Calculadora/>
      <PreFooter />
    </>
  );
};

export default page;
