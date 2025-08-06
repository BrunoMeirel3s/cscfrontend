import PrimaryHeadline from "../global/primary-headline";
import { FAQData } from "@/lib/data";
import FAQItem from "../shared/FAQItem";

const FAQs = () => {
  return (
    <div className="bg-grey pb-11 pt-20">
      <div className="container">
        <PrimaryHeadline text="Frequently Asked Questions" />
        <div className="flex flex-wrap pt-3 ">
          {FAQData.map((item) => (
            <FAQItem
              key={`faq${item.id}`}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
