import React from "react";
import InnerBanner from "@/components/global/inner-banner";
import TeamMembers from "@/components/who-we-are/TeamMembers";
import TopText from "@/components/who-we-are/TopText";
import CTA from "@/components/shared/CTA";
import WeAreBest from "@/components/who-we-are/WeAreBest";
import WhyChooseUs from "@/components/who-we-are/WhyChooseUs";
import PreFooter from "@/components/shared/PreFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos - Lawyero",
  description: "Your one stop solution for legal matters",
};
const page = () => {
  return (
    <>
      <InnerBanner text="QUEM SOMOS" />
      <TopText />
      <TeamMembers />
      

      {
        /* 
        <CTA
        bgClass="bg-primary-main"
        headline="Get the consultation For Most Complex Legal Issues."
        buttonLink="#"
        buttonText="Contact Us"
        ctaType="withBg"
        buttonType="dark"
      />
      <WhyChooseUs />
      <WeAreBest />
        
        */
      }
      <PreFooter />
    </>
  );
};

export default page;
