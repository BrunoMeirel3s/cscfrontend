import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface buttonCustomProps {
  text: string;
  href: string;
  buttonType?: string;
}

const ButtonCustom = ({ text, href, buttonType }: buttonCustomProps) => {
  const buttonType1 = (
    <>
      <Link className="primary-button group" href={href}>
        {text}
        <ChevronRight
          size="15"
          className="absolute right-1/3 top-1/2 -translate-y-1/2 opacity-0 group-hover:right-5 group-hover:opacity-100"
        />
      </Link>
    </>
  );

  const buttonType2 = buttonType === "secondary" && (
    <Link className="primary-button-dark group" href={href}>
      {text}
      <ChevronRight
        size="15"
        className="absolute right-1/3 top-1/2 -translate-y-1/2 opacity-0 group-hover:right-5 group-hover:opacity-100"
      />
    </Link>
  );

  const buttonType3 = buttonType === "dark" && (
    <Link className="secondary-button group" href={href}>
      {text}
      <ChevronRight
        size="15"
        className="absolute right-1/3 top-1/2 -translate-y-1/2 opacity-0 group-hover:right-5 group-hover:opacity-100"
      />
    </Link>
  );

  switch (buttonType) {
    case "dark":
      return buttonType3;

    case "secondary":
      return buttonType2;

    default:
      return buttonType1;
  }
};

export default ButtonCustom;
