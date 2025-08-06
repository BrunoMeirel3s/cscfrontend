import InnerBanner from "@/components/global/inner-banner";
import { ContactForm } from "@/components/global/ContactForm";
import PrimaryHeadline from "@/components/global/primary-headline";
import Iframe from "@/components/shared/Iframe";
import { MapPin, PhoneCallIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Lawyero",
  description: "Your one stop solution for legal matters",
};

const page = () => {
  return (
    <>
      <InnerBanner text="Contato" />
      <div className="w-full">
        <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.678096947321!2d-48.38189022491698!3d-1.3698290986172093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a4f55ffc71c38b%3A0xaf1134818b832b38!2sBusiness%20316!5e0!3m2!1sen!2sbr!4v1742161758911!5m2!1sen!2sbr"/>
        
      </div>

      <div className="overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="relative basis-full pb-20 pr-0 pt-16 before:z-[-1] lg:basis-2/3 lg:pr-12 lg:pt-24">
              <PrimaryHeadline
                text="Agende um Atendimento"
                additionalClass="text-3xl primary-headline-left"
                headlineType="h3"
              />
              <p className="mb-5 text-base leading-7 text-[#333]">
                Entre em contato conosco através do nosso telefone
                ou preencha o formulário a seguir. 
                E um de nossos representantes entrará em contato com você.
                
              </p>
              <ContactForm />
            </div>
            <div className="relative basis-full pb-16 pt-0 lg:basis-1/3 lg:pb-20 lg:pt-24">
              <PrimaryHeadline
                text="Entre em Contato"
                additionalClass="text-3xl primary-headline-left"
                headlineType="h3"
              />
              <ul>
                <li className="mb-[10px] flex items-center">
                  <PhoneCallIcon size={15} className="text-primary-main" />
                  <a
                    className="ml-2 inline-block text-base text-background"
                    href="tel:1911-462-242"
                  >
                    (91)99200-1688
                  </a>
                </li>
              </ul>
              <div>
                <div className="mt-7">
                  <h3 className="mb-5 text-2xl font-bold text-[#333]">
                    Sede
                  </h3>
                  <div className="flex">
                    <MapPin size={15} className="mt-1 text-primary-main" />
                    <p className="pl-2 text-background">
                      BR 316, 501, Ed Buseniss 316, Sala 502, <br /> bairro Centro, Ananindeua/PA.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-7 mt-8 text-2xl font-bold text-[#333]">
                    Horario de Funcionamento
                  </h3>
                  <ul className="text-base leading-6 text-[#313131]">
                    <li className="relative flex border-b border-[#313131] py-4">
                      <span className="w-1/2 font-bold">Segunda-Feira</span>
                      <span className="w-1/2 text-right">09:00 - 17:00</span>
                    </li>
                    <li className="relative flex border-b border-[#313131] py-4">
                      <span className="w-1/2 font-bold">Terça- Feira</span>
                      <span className="w-1/2 text-right">09:00 - 17:00</span>
                    </li>
                    <li className="relative flex border-b border-[#313131] py-4">
                      <span className="w-1/2 font-bold">Quarta- Feira</span>
                      <span className="w-1/2 text-right">09:00 - 17:00</span>
                    </li>
                    <li className="relative flex border-b border-[#313131] py-4">
                      <span className="w-1/2 font-bold">Quinta- Feira</span>
                      <span className="w-1/2 text-right">09:00 - 17:00</span>
                    </li>
                    <li className="relative flex border-b border-[#313131] py-4">
                      <span className="w-1/2 font-bold">Sexta- Feira</span>
                      <span className="w-1/2 text-right">09:00 - 17:00</span>
                    </li>
                    <li className="relative flex py-4">
                      <span className="w-1/2 font-bold">Sábado - Domingo</span>
                      <span className="w-1/2 text-right">Fechado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
