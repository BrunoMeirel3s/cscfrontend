import { FAQsProps } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";

const Accordions = ({ data }: { data: FAQsProps[] }) => {
  return (
    <Accordion className="pt-3" type="single" collapsible>
      {data.map((item) => (
        <AccordionItem
          className="mb-5 border-b-0"
          value={`item-${item.id}`}
          key={item.id}
        >
          <AccordionTrigger className="rounded-md border-2 border-background px-4 py-2 text-left text-base font-semibold text-background hover:no-underline focus:bg-background focus:text-white">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="relative mt-5 rounded-md border-2 border-background p-4 text-base leading-6 before:absolute before:left-[30px] before:top-[-22px] before:h-5 before:w-[2px] before:bg-background before:content-[''] after:absolute after:right-[30px] after:top-[-22px] after:h-5 after:w-[2px] after:bg-background after:content-['']">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordions;
