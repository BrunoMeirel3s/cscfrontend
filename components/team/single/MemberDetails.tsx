import Image from "next/image";
import Link from "next/link";

import homefirmimage from "@/public/assets/home-member1.jpg";
import PrimaryHeadline from "@/components/global/primary-headline";
import React from "react";
import { Facebook, LinkedinIcon, Youtube, Instagram } from "lucide-react";

const memberSocialLinks: {
  name: string;
  link: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/clebiadesousacosta/",
    icon: <Instagram size={30} />,
  }
];

const MemberDetails = () => {
  return (
    <div className="container py-8 lg:py-8">
      <div className="flex flex-wrap gap-8 lg:flex-nowrap">
        <div className="basis-full lg:basis-[30%]">
          <Image
            src={homefirmimage}
            alt="Home Firm Image"
            className="rounded-md"
          />
          <ul className="flex items-center justify-center py-5">
            {memberSocialLinks.map((link) => (
              <li className="ml-3 w-8" key={link.name}>
                <Link href={link.link} target="_blank">
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-full lg:basis-[70%]">
          <PrimaryHeadline
            text="Sobre a Advogada"
            additionalClass="primary-headline-left"
          />
          <div className="text-base text-[#333]">
            <p className="mb-6">
              À frente de tudo está Clêbia de Sousa Costa, Advogada OAB/PA nº 13.915, 
              fundadora do escritório, liderando com dedicação e paixão pela advocacia.
            </p>
            <p className="mb-6">
              Há 13 anos recém formada e advogada, teve a honra de realizar sustentação oral 
              no TSE por intermédio do meu mentor Dr Miguel Lobato de Vilhena que infelizmente 
              em 2005 nos deixou vítima de câncer.
            </p>
            <p className="mb-6">
              Atualmente atua ao lado do povo paraense, 
              defendendo direitos e construindo soluções nas áreas fazendária, 
              previdenciária, trabalhista, cívica e de contratos e licitações, 
              entre diversas outras áreas do direito.
            </p>
            <p className="mb-6">
              Segue construindo uma história pautada na ética, no respeito, na sustentabilidade e 
              na valorização dos direitos de nossos clientes. Estamos prontos para crescer e enfrentar
              os desafios que 2025 nos trará!  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
