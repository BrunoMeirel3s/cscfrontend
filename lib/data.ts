import homeblog1 from "@/public/assets/home-blog-1.jpg";
import homeblog2 from "@/public/assets/home-blog-2.jpg";
import homeblog3 from "@/public/assets/home-blog-3.jpg";
import homeblog4 from "@/public/assets/home-blog-4.jpg";
import homeblog5 from "@/public/assets/home-blog-5.jpg";
import homeblog6 from "@/public/assets/home-blog-6.jpg";
import teammember1 from "@/public/assets/team-member-1.jpg";
import teammember2 from "@/public/assets/team-member-2.jpg";
import teammember3 from "@/public/assets/team-member-3.jpg";
import teammember4 from "@/public/assets/team-member-4.jpg";
import teammember5 from "@/public/assets/team-member-5.jpg";
import teammember6 from "@/public/assets/team-member-6.jpg";
import testimonialimg1 from "@/public/assets/home-testimonial-img-1.jpeg";
import testimonialimg2 from "@/public/assets/home-testimonial-img-2.jpeg";
import testimonialimg3 from "@/public/assets/home-testimonial-img-3.jpeg";
import paimage1 from "@/public/assets/pa-img-1.jpg";
import paimage2 from "@/public/assets/pa-img-2.jpg";
import paimage3 from "@/public/assets/pa-img-3.jpg";
import paimage4 from "@/public/assets/pa-img-4.jpg";
import paimage5 from "@/public/assets/pa-img-5.jpg";
import paimage6 from "@/public/assets/pa-img-6.jpg";
import paimage7 from "@/public/assets/pa-img-7.jpg";
import paimage8 from "@/public/assets/pa-img-8.jpg";
import homepageTypewriter from "@/public/assets/lawyer-ticker-min.jpg";
import banner1 from "@/public/assets/banner/banner1.jpg";
import banner2 from "@/public/assets/banner/banner2.jpg";
import banner3 from "@/public/assets/banner/banner3.jpg";
import {
  FAQsProps,
  PADataProps,
  TeamMembersProps,
  TestimonialsProps,
  attorneyEducatonProps,
  bannerItemsType,
  blogCategoriesProps,
  blogPostsProps,
  blogTagsProps,
  homeBannerTypewriterProps,
} from "@/types";

// Data for Homepage Banner
export const bannerItems: bannerItemsType[] = [
  {
    id: 1,
    image: banner1,
    linkHref: "#",
  },
  {
    id: 2,
    image: banner2,
    linkHref: "#",
  },
  {
    id: 3,
    image: banner3,
    linkHref: "#",
  },
];

// Data for Blog Posts
export const blogPosts: blogPostsProps[] = [
  {
    id: 1,
    featuredImage: {
      node: {
        mediaItem: homeblog1,
      },
    },
    linkHref: "/blog/1",
    title: "When to seek legal help? Important to know when",
    excerpt:
      "Many people are not aware of their legal rights and dont pay attention to the helping hand they can get from legal advise. Therefore it is very important to know that you are aware of...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 1,
  },
  {
    id: 2,
    featuredImage: {
      node: {
        mediaItem: homeblog2,
      },
    },
    linkHref: "/blog/2",
    title: "Seek immediate legal advice when most needed",
    excerpt:
      "Every person have suffered from violence at work, home, school or any other place at least once in their life time. Most people dont share their experiences as they think this will be inappropriate to...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 0,
  },
  {
    id: 3,
    featuredImage: {
      node: {
        mediaItem: homeblog3,
      },
    },
    linkHref: "/blog/3",
    title: "What it takes to be a lawyer (the untold story)",
    excerpt:
      "Emergency can be caused anywhere and can happen to anybody. People in the US have Emergency coverage provided by the government but it involves filling your case with great attention and need to be persuaded...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 0,
  },
  {
    id: 4,
    featuredImage: {
      node: {
        mediaItem: homeblog4,
      },
    },
    linkHref: "/blog/4",
    title: "When to seek legal help? Important to know when",
    excerpt:
      "Whenever you are involved in an accident always avoid giving any statement before contacting you attorney. Legal advise is really important in these matters and your initial reaction can be make or break for your...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 0,
  },
  {
    id: 5,
    featuredImage: {
      node: {
        mediaItem: homeblog5,
      },
    },
    linkHref: "/blog/5",
    title: "Seek immediate legal advice when most needed",
    excerpt:
      "Many people are not aware of their legal rights and dont pay attention to the helping hand they can get from legal advise. Therefore it is very important to know that you are aware of...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 0,
  },
  {
    id: 6,
    featuredImage: {
      node: {
        mediaItem: homeblog6,
      },
    },
    linkHref: "/blog/6",
    title: "When to seek legal help? Important to know when",
    excerpt:
      "Many people are not aware of their legal rights and dont pay attention to the helping hand they can get from legal advise. Therefore it is very important to know that you are aware of...",
    date: "2024-03-19T12:24:34",
    author: "Lawyero",
    comments: 2,
  },
];

// Data for FAQs
export const FAQData: FAQsProps[] = [
  {
    id: 1,
    question: "Do I Have A Case?",
    answer:
      "The answer of this question depends upon situation to situation. The best answer can only be achieved once you contact one of attorney who will guide you.",
  },
  {
    id: 2,
    question: "Do Hiring You Guarantee Results?",
    answer:
      "The short answer to this question is No. Every case is different and prior results although show very high success rate but it still doesnt guarantee the same outcome.",
  },
  {
    id: 3,
    question: "What Is Your Consultation Fees?",
    answer:
      "The consultation is absolutely free. Yes you have read it right absolutely free. Once you hire us for your case we only charge then.",
  },
  {
    id: 4,
    question: "Which Areas Do You Cover?",
    answer:
      "We cover multiple areas mainly involving Family Law, Child Law, Emergency Law and Business Law. The complete list of all the practice areas can be found on this website.",
  },
  {
    id: 5,
    question: "What Is Attorney Customer Relationship?",
    answer:
      "The initial consultation doesnt include Attorney Customer relationship. Only once you hire us then the attorney customer relationship is built.",
  },
  {
    id: 6,
    question: "Do You Screen All The Information You Get?",
    answer:
      "At lawyero we treat privacy very strictly. All the information that you provide is confidential and wont be leaked under any circumstances.",
  },
];

// Data for Team Members
export const TeamMembers: TeamMembersProps[] = [
  {
    id: 1,
    image: teammember1,
    href: "/clebia-souza-costa/",
    name: "Clêbia Sousa Costa",
    designation: "Advogada e Fundadora",
  },
  {
    id: 2,
    image: teammember2,
    href: "#",
    name: "Socorro Costa",
    designation: "Contadora",
  },
  {
    id: 4,
    image: teammember4,
    href: "#",
    name: "Ariana de Paula",
    designation: "Estágiaria",
  },
  {
    id: 5,
    image: teammember5,
    href: "#",
    name: "Ana Luiza Costa",
    designation: "Estagiária",
  },
  {
    id: 6,
    image: teammember6,
    href: "#",
    name: "Rutiely Melo",
    designation: "Colaboradora",
  }
];

// Data for Testimonials
export const Testimonials: TestimonialsProps[] = [
  {
    id: 1,
    image: testimonialimg1,
    name: "Jessica Berrera",
    text: "When we needed the legal assistance Lawyero came to our rescue. They took our case and get it solved in no time. Now when ever we need any assistance for legal matters we look no further then the lawyers at Lawyero. Thanks team Lawyero you are the best!",
    organization: "Opus Internatational Ltd",
    designation: "CEO Operations",
  },
  {
    id: 2,
    image: testimonialimg2,
    name: "John Kerry",
    text: "Our business was stuck in one of complex legal issue and one of our clients suggest team Lawyero. Now they are our official legal team which help us in numerous cases. Recommended to all!",
    organization: "Parag States",
    designation: "Founder",
  },
  {
    id: 3,
    image: testimonialimg3,
    name: "Grant Josh",
    text: "Team Lawyero is the best. Their team is awesome and when we visited their office their team welcomed us and make us feel really at home. They not only took our case but also helped us understand the complexity of the case. They fought for us and get the desired results soon. Thank you team lawyero! You are AWESOME.",
    organization: "Daily Times Network",
    designation: "Assistant Finance Manager",
  },
];

// Data for Practice Areas
export const PAData: PADataProps[] = [
  {
    id: 1,
    href: "/single-practice-area",
    title: "Family Law",
    text: "Family law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage1,
  },
  {
    id: 2,
    href: "/single-practice-area",
    title: "Child Custody",
    text: "Child custody involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage2,
  },
  {
    id: 3,
    href: "/single-practice-area",
    title: "Emergency Law",
    text: "Emergency law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage3,
  },
  {
    id: 4,
    href: "/single-practice-area",
    title: "Criminal Law",
    text: "Criminal law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage4,
  },
  {
    id: 5,
    href: "/single-practice-area",
    title: "Business Law",
    text: "Business law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage5,
  },
  {
    id: 6,
    href: "/single-practice-area",
    title: "Real Estate Law",
    text: "Real estate law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage6,
  },
  {
    id: 7,
    href: "/single-practice-area",
    title: "Personal Injury",
    text: "Personal injury involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage7,
  },
  {
    id: 8,
    href: "/single-practice-area",
    title: "Immigration Law",
    text: "Immigration law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage8,
  },
  {
    id: 9,
    href: "/single-practice-area",
    title: "Family Law",
    text: "Family law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage1,
  },
  {
    id: 10,
    href: "/single-practice-area",
    title: "Child Custody",
    text: "Child custody involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage2,
  },
  {
    id: 11,
    href: "/single-practice-area",
    title: "Emergency Law",
    text: "Emergency law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage3,
  },
  {
    id: 12,
    href: "/single-practice-area",
    title: "Criminal Law",
    text: "Criminal law involves a range of matters that are usually very personal, unique and emotionally challenging.",
    image: paimage4,
  },
];

// Data for Team Member Education
export const attorneyEducaton: attorneyEducatonProps[] = [
  {
    id: 1,
    title: "Attorney of Law",
    details: [
      {
        id: 11,
        text: "Texas Southern University – Thurgood Marshall School of Law, Juris Doctor (J.D.), Houston, TX",
      },
      {
        id: 12,
        text: "Paul Quinn College, Bachelor of Science (B.S.), Dallas, TX",
      },
    ],
  },
  {
    id: 2,
    title: "Admission Bar",
    details: [
      {
        id: 21,
        text: "State Bar of Texas, 2010",
      },
      {
        id: 22,
        text: "U.S. District Court – Northern District of Texas",
      },
    ],
  },
  {
    id: 3,
    title: "Bar Membership",
    details: [
      {
        id: 31,
        text: "Texas Trial Lawyer’s Association",
      },
      {
        id: 32,
        text: "Dallas Association of Young Lawyers",
      },
    ],
  },
];

// Data for Blog Categories
export const blogCategories: blogCategoriesProps[] = [
  {
    id: 1,
    title: "Attorney Law",
  },
  {
    id: 2,
    title: "Family Law",
  },
  {
    id: 3,
    title: "Criminal Law",
  },
  {
    id: 4,
    title: "Real Estate Law",
  },
  {
    id: 5,
    title: "Immigration Law",
  },
];

// Data for Blog Tags
export const blogTags: blogTagsProps[] = [
  {
    id: 1,
    name: "Accident",
  },
  {
    id: 2,
    name: "Law",
  },
  {
    id: 3,
    name: "Attorney",
  },
];

// Data for Home Banner Typewriter
export const homeBannerTypewriter: homeBannerTypewriterProps = {
  image: homepageTypewriter,
  words: [
    "Criminal Law",
    "Divorce Law",
    "Family Law",
    "Immigration Law",
    "Real Estate Law",
  ],
};
