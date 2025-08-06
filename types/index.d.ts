import { StaticImageData } from "next/image";
import React from "react";

export interface bannerItemsType {
  id: number;
  image: StaticImageData;
  linkHref: string;
}

export interface URLParams {
  params: { id: string };
  searchParams?: { [key: string]: string };
}

export interface blogPostsProps {
  id: number;
  featuredImage: {
    node: {
      mediaItem: StaticImageData;
    };
  };
  title: string;
  linkHref: string;
  excerpt: string;
  date: string;
  author: string;
  comments: number;
}

export interface FAQsProps {
  id: number;
  question: string;
  answer: string;
}

export interface TeamMembersProps {
  id: number;
  name: string;
  href: string;
  image: StaticImageData;
  designation: string;
}

export interface TestimonialsProps {
  id: number;
  image: StaticImageData;
  name: string;
  text: string;
  organization: string;
  designation: string;
}

export interface PADataProps {
  id: number;
  href: string;
  title: string;
  text: string;
  image: StaticImageData;
}

export interface attorneyEducatonProps {
  id: number;
  title: string;
  details: {
    id: number;
    text: string;
  }[];
}

export interface blogCategoriesProps {
  id: number;
  title: string;
}

export interface blogTagsProps {
  id: number;
  name: string;
}

export interface homeBannerTypewriterProps {
  image: StaticImageData;
  words: string[];
}

export interface BannerIconBoxesProps {
  id: number;
  headline: string;
  content: string;
  iconName: React.ReactNode;
  iconNameMobile?: React.ReactNode;
  type: string;
}

export interface FeaturesProps {
  id: number;
  headline: string;
  content: string;
  iconName: React.ReactNode;
}

export interface HomepagePAsProps {
  id: number;
  link: string;
  PA: string;
  iconName: React.ReactNode;
}

export interface StatsWithIconProps {
  id: number;
  amountPreText: string;
  amount: number;
  amountPostText: string;
  text: string;
  iconName: React.ReactNode;
}

export interface ValoresJurisCalc {
  id: string;
  valor: number;
  dataValor: string;
  descricaoValor: string;
}

export interface MultasJurisCalc {
  id: string;
  valor: number;
  porcentagem: number;
  descricaoMulta: string;
}

export interface DadosCalculoRevezamento {
  id: string;
  dataMes: string;
  dataExtenso: string;
  horaEntrada: string;
  horaSaida: string;
  horasTrabalhadas: number;
  horasAdicionalNoturno: number;
  valorRemuneracao: number | null;
  valorHora: string | number;
  valorAcrescimo: number;
  valorAdicionalNoturno: number;
  valorAdicionalNoturnoAtualizado: number;
  jurosCompensatorios050: number;
  valorTotal: number;
}

export interface DialogBodyProps {
  header: string;
  content: string;
}
