"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";

interface propTypes {
  iconName: React.ReactNode;
  iconNameMobile?: React.ReactNode;
  headline: string;
  content: string;
  type: string | undefined;
}

const IconBox = ({ iconName, iconNameMobile, headline, content, type }: propTypes) => {
  useGSAP(() => {
    gsap.to(".box", {
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      y: 0,
    });
  });

  return (
    <div
      // eslint-disable-next-line
      className={`sm:basis-full lg:basis-1/3 ${type} box translate-y-10 px-2 lg:px-10 pb-2 lg:pb-8 pt-2 lg:pt-10 opacity-0`}
    >
      <span className="hidden lg:block">{iconName}</span>
      <span className="block lg:hidden">{iconNameMobile}</span>
      <h3 className="mb-1 lg:mb-3 mt-2 lg:mt-5 text-md lg:text-2xl font-bold text-black">{headline}</h3>
      <p className="text-sm lg:text-base">{content}</p>
    </div>
  );
};

export default IconBox;
