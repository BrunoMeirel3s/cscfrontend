"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useRef, useState } from "react";
import { formatCurrency } from "@/lib/utilFunctons";

gsap.registerPlugin(ScrollTrigger);

interface StatsCounterIconBoxProps {
  iconName: React.ReactNode;
  amountPreText: string;
  amount: number;
  amountPostText: string;
  text: string;
}

const StatsCounterIconBox = ({
  iconName,
  amountPreText,
  amount,
  amountPostText,
  text,
}: StatsCounterIconBoxProps) => {
  const [endAmount] = useState(amount);

  const amountRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(amountRef.current, {
      duration: 2,
      innerHTML: endAmount,
      roundProps: "innerHTML",
      scrollTrigger: {
        trigger: amountRef.current,
        start: "top 70%",
      },
      onUpdate: () => {
        if (amountRef.current) {
          const currentValue = parseFloat(
            amountRef.current.innerHTML.replace(/[^0-9.-]+/g, "")
          );
          amountRef.current.innerHTML = formatCurrency(currentValue);
        }
      },

      onComplete: () => {
        if (amountRef.current) {
          amountRef.current.innerHTML = formatCurrency(endAmount);
        }
      },
    });
  });

  return (
    <div className="flex items-center sm:basis-full sm:justify-start md:justify-start">
      {iconName}
      <h3 className="mb-3 mt-5 pl-8 text-3xl font-bold text-white md:mb-5">
        <span className="block">
          {amountPreText || ""}
          <span ref={amountRef}>0</span>
          {amountPostText || ""}
        </span>{" "}
        {text}
      </h3>
    </div>
  );
};

export default StatsCounterIconBox;
