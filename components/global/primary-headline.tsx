import { splitHeadline } from "@/lib/utilFunctons";
import React from "react";
interface headlineProps {
  text: string;
  additionalClass?: string;
  headlineType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  formatTwoColor?: boolean;
}

const PrimaryHeadline = ({
  text,
  additionalClass,
  headlineType,
  formatTwoColor,
}: headlineProps) => {
  let formattedText: string | React.ReactNode = text;
  const Tag = headlineType || "h2";

  formatTwoColor && (formattedText = splitHeadline(text));

  if (additionalClass) {
    return <Tag className={`${additionalClass}`}>{formattedText}</Tag>;
  }

  return <Tag className="primary-headline">{formattedText}</Tag>;
};

export default PrimaryHeadline;
