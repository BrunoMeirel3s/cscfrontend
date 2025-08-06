import PrimaryHeadline from "../global/primary-headline";

interface HeadlineWithTextProps {
  headlineText: string;
  text: string;
}

const HeadlineWithText = ({ headlineText, text }: HeadlineWithTextProps) => {
  return (
    <div className="container sm:pt-20 pt-14 pb-7">
      <PrimaryHeadline text={headlineText} />
      <div className="pt-2 lg:px-10 px-0 text-center">
        <p className="text-base leading-6 text-[#333]">{text}</p>
      </div>
    </div>
  );
};

export default HeadlineWithText;
