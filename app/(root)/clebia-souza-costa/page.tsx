import React from "react";
import singleteambanner from "@/public/assets/single-team-members-banner.jpg";
import InnerBanner from "@/components/global/inner-banner";
import MemberDetails from "@/components/team/single/MemberDetails";
import PreFooter from "@/components/shared/PreFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membros do Time",
  description: "Clêbia Sousa Costa",
};

const page = () => {
  return (
    <>
      <InnerBanner text="Clêbia Sousa Costa" image={singleteambanner} />
      <MemberDetails />
      <PreFooter />
    </>
  );
};

export default page;
