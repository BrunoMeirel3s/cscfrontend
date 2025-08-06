"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = () => {
  useGSAP(() => {
    // gsap.to("#loading-ball", {
    //   left: "134px",
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 1.2,
    //   ease: "circ.inOut",
    // });
    gsap.from("#loading-text span", {
      opacity: 0,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  });
  return (
    <>
      <div className="absolute left-0 top-0 z-[100] flex h-screen w-full flex-col items-center justify-center  bg-primary-main text-2xl font-bold">
        <div className="mb-4" id="loading-text">
          Carregando<span className="opacity-100">.</span>
          <span className="opacity-100">.</span>
          <span className="opacity-100">.</span>
        </div>
        {/* <div className="h-7 w-40 rounded-full border-2 border-background">
          <span
            className="relative left-[2px] top-[2px] flex size-5 rounded-full bg-background opacity-90"
            id="loading-ball"
          ></span>
        </div> */}
      </div>
    </>
  );
};

export default Loading;
