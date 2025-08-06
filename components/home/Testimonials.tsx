import React from "react";
import { TestimonialsCarousel } from "../shared/TestimonialsCarousel";
import libraryicon from "@/public/assets/library-icon-grey.svg";
import Image from "next/image";
import testimonialbg from "@/public/assets/home-testimonial-bg.jpg";

const Testimonials = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-grey before:absolute before:left-0 before:top-0 before:z-[2] before:size-full before:bg-[#1a2431] before:opacity-70 before:content-['']">
        <Image
          src={libraryicon}
          alt="library-icon"
          className="absolute top-0 z-[3] w-full rotate-180"
        />
        <Image
          src={testimonialbg}
          alt="testimonial-bg"
          fill={true}
          className="object-cover"
        />
        <div className="container relative z-[3] pb-28 pt-16 sm:pb-14 lg:pb-20 lg:pt-24">
          <h2 className="relative z-[1] mb-12 pb-2 text-center text-[25px] font-bold text-white before:absolute before:inset-x-0 before:bottom-0 before:m-auto before:h-[3px] before:w-36 before:bg-white sm:text-[40px]">
            What Our Customers Say
          </h2>
          <TestimonialsCarousel />
        </div>
      </div>
    </>
  );
};

export default Testimonials;
