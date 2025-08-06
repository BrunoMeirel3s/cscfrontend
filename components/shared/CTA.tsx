import React from "react";
import ButtonCustom from "../global/button";
import Link from "next/link";
import Image from "next/image";
import homeconsultationcall from "@/public/assets/home-request-consultation.jpg";

interface CTAProps {
  bgClass?: string;
  headline: string;
  buttonLink: string;
  buttonText: string;
  ctaType: string;
  buttonType?: string;
}

const CTA = ({
  bgClass,
  headline,
  buttonLink,
  buttonText,
  ctaType,
  buttonType,
}: CTAProps) => {
  let CTAWithImage;

  ctaType === "withBg" &&
    (CTAWithImage = (
      <div className={`${bgClass || "bg-background"} py-6`}>
        <div className="container">
          <div className="flex flex-wrap items-center lg:flex-nowrap">
            <div className="basis-full">
              <h3 className="text-center text-xl text-white lg:text-left">
                {headline}
              </h3>
            </div>
            
          </div>
        </div>
      </div>
    ));

  ctaType === "withImage" &&
    (CTAWithImage = (
      <div className="relative overflow-hidden bg-black py-20 before:absolute before:left-0 before:top-0 before:z-[2] before:size-full before:bg-[#1a2431] before:opacity-70 before:content-['']">
        <Image
          src={homeconsultationcall}
          alt="Home Consultation Call"
          fill={true}
          className="object-cover"
        />
        <div className="container relative z-[3] text-center">
          <h2 className="mb-9 inline-block text-center text-[25px] font-bold leading-10 text-white sm:px-0 sm:text-[40px] lg:px-14">
            {headline}
          </h2>
          <Link
            className="inline-block border-[3px] border-white px-3 py-4 text-base font-bold text-white"
            href={buttonLink}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    ));

  return CTAWithImage;
};

export default CTA;
