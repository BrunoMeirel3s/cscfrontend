import React from "react";
import ButtonCustom from "../global/button";
import PrimaryHeadline from "../global/primary-headline";
import Image from "next/image";
import homefirmimage from "@/public/assets/home-member1.jpg";

const TwoColumnTextWithImage = () => {
  return (
    <div className="container py-8 sm:py-14">
      <div className="flex flex-wrap gap-8 lg:flex-nowrap">
        <div className="basis-full lg:basis-[70%]">
          <PrimaryHeadline text="Sobre Nós" />
          <div className="text-base text-[#333]">
            <p className="mb-6">
                Há mais de 17 anos, temos a honra de atuar ao lado do povo paraense, 
              defendendo direitos e construindo soluções nas áreas fazendária, 
              previdenciária, trabalhista, cívica e de contratos e licitações, 
              entre diversas outras áreas do direito. 
            </p>

            <p className="mb-6">
               Ao longo dessa trajetória, acumulamos experiência em diversas frentes, 
              desde parcerias com instituições como o Sindicato da Polícia Civil do 
              Estado do Pará, associações sem fins lucrativos, prefeituras municipais 
              e empresas privadas, além da atuação em causas individuais. Sempre com 
              um olhar voltado para os direitos humanos, justiça social e sustentabilidade 
              amazônica, garantimos direitos e promovemos a defesa de quem mais precisa.
            </p>
          </div>
          
          {/*
          <ButtonCustom href="#" text="Leia Mais" buttonType="secondary" />
          */}
        </div>
        <div className="flex basis-full justify-center sm:text-center lg:block lg:basis-[30%]">
          <Image
            src={homefirmimage}
            alt="Home Firm Image"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default TwoColumnTextWithImage;
