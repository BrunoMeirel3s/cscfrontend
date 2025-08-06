import React from "react";
import singleteambanner from "@/public/assets/single-team-members-banner.jpg";
import InnerBanner from "@/components/global/inner-banner";
import MemberDetails from "@/components/team/single/MemberDetails";
import Stats from "@/components/team/single/Stats";
import CTA from "@/components/shared/CTA";
import PreFooter from "@/components/shared/PreFooter";
import Quote from "@/components/shared/Quote";
import BackgroundAndPA from "@/components/team/single/BackgroundAndPA";
import { Metadata } from "next";
import Calculadora from "@/components/calculadora-antiga/Calculadora";



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
