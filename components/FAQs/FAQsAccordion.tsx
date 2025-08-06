import React from "react";
import PrimaryHeadline from "../global/primary-headline";
import Accordions from "../shared/Accordions";
import { FAQData } from "@/lib/data";

const FAQsAccordion = () => {
  return (
    <div className="container lg:pt-[85px] pt-[70px] lg:pb-20 pb-16">
      <PrimaryHeadline text="FAQs Accordion" />
      <Accordions data={FAQData} />
    </div>
  );
};

export default FAQsAccordion;
