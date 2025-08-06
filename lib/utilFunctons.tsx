import { Fragment } from "react";

export function splitHeadline(headline: string) {
  const words = headline.split(" ");
  return words.map((word, index) => (
    <Fragment key={index}>
      {index === 0 ? (
        <span className="inline-block text-primary-main">{word}</span>
      ) : (
        " " + word
      )}
    </Fragment>
  ));
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export const formatCurrency = (amount: number) => {
  // Format the number as currency without the dollar sign
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("$", "");
};
