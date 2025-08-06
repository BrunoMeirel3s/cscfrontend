import React from "react";
import InnerBanner from "@/components/global/inner-banner";
import HeadlineWithText from "@/components/shared/HeadlineWithText";
import PAList from "@/components/practice-areas/PAList";
import PreFooter from "@/components/shared/PreFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description: "CSB",
};
const page = () => {
  return (
    <>
      <InnerBanner text="Áreas de Atuação" />
      <HeadlineWithText
        headlineText="Áreas de Atuação"
        text="Atendemos as seguintes áreas:"
      />
      <PAList layout="2-column" />
      <PreFooter />
    </>
  );
};

export default page;
