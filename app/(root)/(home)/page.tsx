import PostBannerBox from "@/components/home/postBannerBox";
import TwoColumnTextWithImage from "@/components/home/twoColumnTextWithImage";
import CTA from "@/components/shared/CTA";
import TeamMembers from "@/components/home/TeamMembers";
import Banner from "@/components/home/banner";
import PreFooter from "@/components/shared/PreFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clêbia Souza Costa",
  description: "Clêbia Souza Costa Advogada",
};

const Home = () => {
  return (
    <>
      <Banner />
      <PostBannerBox />
      {/* <IconsWithCounters /> */}
      <TwoColumnTextWithImage />
      {/* <Features />*/}
      {/* <PracticeAreas />*/}
      {/* <FAQs />*/}

      <TeamMembers />
      <CTA
        headline="Tratamos cada caso com a mesma atenção e dedicação, pois cada cliente é importante para nós."
        buttonLink="#"
        buttonText="Request Free Consultation"
        ctaType="withBg"
      />

      {/* <FAQs /> */}

      {/* <Testimonials />*/}
      <PreFooter />
    </>
  );
};

export default Home;
