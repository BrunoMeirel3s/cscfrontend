import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import ButtonCustom from "../global/button";
import X from "@/public/assets/X.svg";
import { Facebook, Youtube, LinkedinIcon, ChevronRight, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="bg-background">
        <div className="container pb-14 pt-20">
          <div className="flex flex-wrap gap-8 lg:flex-nowrap">
            <div className="basis-full lg:basis-1/3">
              <div>
                <Link href="/home">
                  <Image src={logo} alt="Logo" width={166} height={30} />
                </Link>
              </div>
            </div>
            <div className="basis-full lg:basis-1/3">
              <h3 className="mb-6 text-3xl font-bold text-white">
                <span className="text-[#14cab4]">Aviso</span> Legal
              </h3>
              <div className="mt-5 lg:pb-7">
                <p className="text-sm leading-6 text-white">
                As informações contidas neste site são apenas para fins informativos gerais. 
                Nada neste site deve ser considerado como aconselhamento jurídico para qualquer 
                caso ou situação específica. Essas informações não têm a intenção de criar, 
                e o seu recebimento ou visualização não estabelece, uma relação advogado-cliente.
                </p>
              </div>
            </div>
            <div className="basis-full lg:basis-1/3">
              <h3 className="mb-6 text-3xl font-bold text-white">
                <span className="font-bold text-[#14cab4]">Horário </span> de Funcionamento
              </h3>
              <ul className="text-sm leading-6 text-white">
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Segunda-Feira</span>
                  <span className="w-1/2 text-right">09:00 - 17:00</span>
                </li>
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Terça-Feira</span>
                  <span className="w-1/2 text-right">09:00 - 17:00</span>
                </li>
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Quarta-Feira</span>
                  <span className="w-1/2 text-right">09:00 - 17:00</span>
                </li>
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Quinta-Feira</span>
                  <span className="w-1/2 text-right">09:00 - 17:00</span>
                </li>
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Sexta-Feira</span>
                  <span className="w-1/2 text-right">09:00- 17:00</span>
                </li>
                <li className="relative my-2 flex pl-5">
                  <ChevronRight
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  />
                  <span className="w-1/2 font-bold">Sábado - Domingo</span>
                  <span className="w-1/2 text-right">Fechado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-main py-7">
        <div className="container">
          <div className="flex flex-wrap items-center lg:flex-nowrap">
            <div className="basis-full lg:basis-1/2">
              <p className="mb-4 text-center text-sm leading-6 text-white lg:mb-0 lg:text-left">
                &copy; Clêbia Souza Costa 2025. Todos os direitos reservados.
              </p>
            </div>
            <div className="basis-full lg:basis-1/2">
              <ul className="flex items-center justify-center lg:justify-end">
                <li className="ml-3 w-8">
                  <Link href="https://www.instagram.com/clebiacosta.adv/" target="_blank">
                    <Instagram size={30} className="text-white" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
