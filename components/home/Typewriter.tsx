"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface homeBannerTypewriterProps {
  homeBannerTypewriter: {
    words: string[];
  };
}
const Typewriter = ({ homeBannerTypewriter }: homeBannerTypewriterProps) => {
  const { words } = homeBannerTypewriter;
  const headlineRef = useRef<HTMLSpanElement>(null);

  let wordIndex = 0;
  let charIndex = 0;

  const [cursorVisible, setCursorVisible] = useState(true);

  const blinkCursor = () => {
    setCursorVisible((prev) => !prev);
    gsap.delayedCall(0.5, blinkCursor);
  };

  useGSAP(() => {
    const headline = headlineRef.current as HTMLElement;
    const typeWriter = () => {
      if (charIndex < words[wordIndex].length) {
        headline.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        gsap.delayedCall(0.1, typeWriter);
      } else {
        gsap.delayedCall(1, eraseText);
      }
    };

    const eraseText = () => {
      const headline = headlineRef.current;

      if (headline && headline.textContent && headline.textContent.length > 0) {
        headline.textContent = headline.textContent.slice(0, -1);
        gsap.delayedCall(0.05, eraseText);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        gsap.delayedCall(0.5, typeWriter);
      }
    };

    typeWriter();
    blinkCursor();
  }, [words]);

  return (
    <>
      <span ref={headlineRef}></span>
      {cursorVisible && <span className="ml-1">|</span>}
    </>
  );
};

export default Typewriter;
