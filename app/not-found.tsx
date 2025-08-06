import { TriangleAlert } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página Não Encontrada",
  description: "Clêbia Sousa Costa",
};

const page = () => {
  return (
    <>
      <div className="container py-[70px] text-center sm:py-[90px]">
        <h1 className="mb-8 text-[25px] font-bold text-[#333] sm:text-[40px]">
          OOPS! ALGO DEU ERRADO
        </h1>
        <div className="flex w-full justify-center text-center">
          <TriangleAlert size={60} />
        </div>
        <p className="mt-9 text-sm font-bold text-[#333]">
          A página que você está tentando acessar não está disponível ou foi movida para outro local.
        </p>
        <div className="mt-2 flex justify-center">
          <span className="inline-block text-base text-[#333]">
            Clique aqui para voltar à{" "}
          </span>
          <Link
            className="ml-1 inline-block text-base text-primary-main"
            href="/"
          >
            Página Inicial
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
