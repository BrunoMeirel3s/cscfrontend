import { ContactForm } from "../global/ContactForm";
import { MapPin, PhoneCallIcon } from "lucide-react";

const PreFooter = () => {
  return (
    <div className="overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="relative basis-full py-16 before:absolute before:-right-1/4 before:top-0 before:z-[-1] before:h-full before:w-[150vw] before:bg-grey before:content-[''] lg:basis-1/3 lg:py-24 lg:before:right-0 lg:before:w-[50vw]">
            <h3 className="relative mb-7 pb-5 text-3xl font-bold text-primary-main before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-[150px] before:bg-background before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-[3px] after:w-[40px] after:bg-primary-main after:content-['']">
              Entre em Contato
            </h3>
            <ul>
              <li className="mb-[10px] flex items-center">
                <PhoneCallIcon size={15} className="text-background" />
                <a
                  className="ml-2 inline-block text-base text-background"
                  href="tel:123-456-7890"
                >
                  (91)99200-1688
                </a>
              </li>
            </ul>
            <div>
              <div className="mt-7">
                <h3 className="mb-4 text-2xl font-bold text-[#333]">
                  Sede
                </h3>
                <div className="flex">
                  <MapPin size={15} className="mt-1 text-background" />
                  <p className="pl-2 text-background">
                    BR 316, 501, Ed Buseniss 316, Sala 502 <br /> Ananindeua - PA
                  </p>
                </div>
              </div>

            </div>
          </div>
          <div className="relative basis-full px-0 py-16 before:absolute before:-left-1/4 before:top-0 before:z-[-1] before:h-full before:w-[150vw] before:bg-lightgrey before:content-[''] lg:basis-2/3 lg:py-24 lg:pl-12 lg:pr-20 lg:before:left-0 lg:before:w-[80vw]">
            <h3 className="relative mb-7 pb-5 text-3xl font-bold text-primary-main before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-[150px] before:bg-background before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-[3px] after:w-[40px] after:bg-primary-main after:content-['']">
              Agende um Atendimento
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
