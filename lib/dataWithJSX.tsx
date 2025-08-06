import {
  BannerIconBoxesProps,
  FeaturesProps,
  HomepagePAsProps,
  StatsWithIconProps,
} from "@/types";
import {
  User,
  BriefcaseBusiness,
  Trophy,
  Link,
  Phone,
  Coffee,
  Scale,
  PersonStanding,
  CarFront,
  PoundSterling,
  Tv,
  CircleGauge,
  Ambulance,
  CirclePlay,
  Handshake,
  GraduationCap,
  Smile,
  Volume2,
  ThumbsUp,
  DollarSign,
} from "lucide-react";

// Data for Homepage Banner Icon Boxes
export const BannerIconBoxes: BannerIconBoxesProps[] = [
  {
    id: 1,
    headline: "Escritório de Advocacia e Assessoria Jurídica",
    content:
      "Oferecemos soluções jurídicas estratégicas e personalizadas, garantindo segurança e confiança para nossos clientes.",
    iconName: (
      <Scale
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
    iconNameMobile: (
      <Scale
        size="30"
        className="border-2 border-primary-main p-1 text-primary-main"
      />
    ),
    type: "bg-grey",
  },
  {
    id: 2,
    headline: "Atuação nas diversas searas jurídicas",
    content:
      "Contamos com uma equipe de advogados altamente qualificados e comprometidos, prontos para oferecer a melhor assessoria em diversas áreas do direito.",
    iconName: (
      <BriefcaseBusiness
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
    iconNameMobile: (
      <BriefcaseBusiness
        size="30"
        className="border-2 border-primary-main p-1 text-primary-main"
      />
    ),
    type: "bg-lightgrey",
  },
  {
    id: 3,
    headline: "Excelência e Compromisso em Soluções Jurídicas",
    content:
      "Nossa equipe de advogados especializados atua com dedicação e estratégia para garantir a melhor assessoria e defesa dos interesses de nossos clientes.",
    iconName: (
      <Handshake
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
    iconNameMobile: (
      <Handshake
        size="30"
        className="border-2 border-primary-main p-1 text-primary-main"
      />
    ),
    type: "bg-grey",
  },
];

// Data for Homepage Features
export const HomepageFeatures: FeaturesProps[] = [
  {
    id: 1,
    headline: "PERSONAL SERVICE",
    content:
      "Our attorneys are committed to you and will work vigorously to obtain the best possible recovery in your case.",
    iconName: (
      <Link
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 2,
    headline: "SCREENING FREE",
    content:
      "At the our law Firm, you do not have to go through a call screen. You will get to speak to an attorney directly, preferably the one who will be handling your case.",
    iconName: (
      <Phone
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 3,
    headline: "ALWAYS RESPONSIVE",
    content:
      "Your attorney will address any problems quickly and respect your time by promptly replying to your inquiries.",
    iconName: (
      <Coffee
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 4,
    headline: "CASE EXPERIENCE",
    content:
      "Our attorneys are experienced and can handle any type of injury case for you.",
    iconName: (
      <BriefcaseBusiness
        size="60"
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
];

// Data for Why Choose Us Section
export const WhyChooseUsData: FeaturesProps[] = [
  {
    id: 1,
    headline: "FREE CONSULTATION",
    content:
      "We offer free consultation and you never need to worry about the fees for consultation.",
    iconName: (
      <Handshake
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 2,
    headline: "MOST QUALIFIED TEAM",
    content:
      "At Lawyero we have the best team which understands your case and try to help you achieve desired results.",
    iconName: (
      <GraduationCap
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 3,
    headline: "NO WIN NO FEES",
    content:
      "We have helped numerous clients in their complicated law matters and we are expert at this.",
    iconName: (
      <PoundSterling
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
];

// Data for We Are Best Section
export const WeAreBestData: FeaturesProps[] = [
  {
    id: 1,
    headline: "WE UNDERSTAND LAW",
    content:
      "We have helped numerous clients in their complicated law matters and we are expert at this.",
    iconName: (
      <Scale
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 2,
    headline: "HAPPY CLIENTS",
    content:
      "About 98% of our clients are satistied with the services they recieved and would be happy to recommend Lawyero to others.",
    iconName: (
      <Smile
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 3,
    headline: "WE LEAD YOU TO SUCCESS",
    content:
      "Our ultimate goal is to help you and we believe that client is our asset.",
    iconName: (
      <Volume2
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
];

// Data for Attorney Practice Area List
export const AttorneyPAList: FeaturesProps[] = [
  {
    id: 1,
    headline: "Family Law",
    content:
      "Robert has been working as a family law attorney for more than 10 years and have solved tons of cases with his expertise.",
    iconName: <Scale size={60} className="h-14 w-16 border-2 border-none" />,
  },
  {
    id: 2,
    headline: "Child Custody",
    content:
      "One of the most difficult and emotional area of law is related to the children law. Robert uses his experience to get these matters solved.",
    iconName: (
      <PersonStanding size={60} className="h-14 w-16 border-2 border-none" />
    ),
  },
  {
    id: 3,
    headline: "Business Law",
    content:
      "Business laws are sometimes quite complex to figure out because of things become complicated when not sure about the laws. Robert is best when it comes to business law.",
    iconName: (
      <PoundSterling size={60} className="h-14 w-16 border-2 border-none" />
    ),
  },
  {
    id: 4,
    headline: "Emergency Law",
    content:
      "Robert has done well in the past 10 years tackling with emergency situations and have successfully taken clients case which lead them to protection under law.",
    iconName: (
      <Ambulance size={60} className="h-14 w-16 border-2 border-none" />
    ),
  },
];

// Data for Homepage Practice Area
export const HomepagePAs: HomepagePAsProps[] = [
  {
    id: 1,
    link: "#",
    PA: "Family Law",
    iconName: (
      <Scale size={60} className="h-14 w-16 border-2 border-none text-white" />
    ),
  },
  {
    id: 2,
    link: "#",
    PA: "Child Custody",
    iconName: (
      <PersonStanding
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
  {
    id: 3,
    link: "#",
    PA: "Auto Accidents",
    iconName: (
      <CarFront
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
  {
    id: 4,
    link: "#",
    PA: "Business Law",
    iconName: (
      <PoundSterling
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
  {
    id: 5,
    link: "#",
    PA: "Internet Fraud",
    iconName: (
      <Tv size={60} className="h-14 w-16 border-2 border-none text-white" />
    ),
  },
  {
    id: 6,
    link: "#",
    PA: "Sports Injury",
    iconName: (
      <CircleGauge
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
  {
    id: 7,
    link: "#",
    PA: "Emergency Law",
    iconName: (
      <Ambulance
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
  {
    id: 8,
    link: "#",
    PA: "Drowning Law",
    iconName: (
      <CirclePlay
        size={60}
        className="h-14 w-16 border-2 border-none text-white"
      />
    ),
  },
];

// Data for Stats Counter
export const StatsWithIcon: StatsWithIconProps[] = [
  {
    id: 1,
    amountPreText: "",
    amount: 150,
    amountPostText: "+",
    text: "Customers",
    iconName: <Handshake size={72} className="border-2 p-4 text-white" />,
  },
  {
    id: 2,
    amountPreText: "$",
    amount: 23000000,
    amountPostText: "",
    text: "Recovered",
    iconName: <DollarSign size={72} className="border-2 p-4 text-white" />,
  },
  {
    id: 3,
    amountPreText: "",
    amount: 98,
    amountPostText: "%",
    text: "Success Rato",
    iconName: <ThumbsUp size={72} className="border-2 p-4 text-white" />,
  },
];

// Data for Stats Counter
export const StatsWithIconTeam: StatsWithIconProps[] = [
  {
    id: 1,
    amountPreText: "",
    amount: 2000,
    amountPostText: "+",
    text: "Happy Clients",
    iconName: (
      <Smile
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 3,
    amountPreText: "",
    amount: 98,
    amountPostText: "%",
    text: "Success Rato",
    iconName: (
      <ThumbsUp
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
  {
    id: 2,
    amountPreText: "$",
    amount: 20000000,
    amountPostText: "",
    text: "Recovered",
    iconName: (
      <DollarSign
        size={72}
        className="border-2 border-primary-main p-4 text-primary-main"
      />
    ),
  },
];
