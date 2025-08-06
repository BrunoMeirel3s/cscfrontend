import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Header = () => {
  return (
    <header className="relative z-20 font-roboto">
      <div className="relative bg-background">
        <div className="container">
          <div className="flex items-center justify-between ">
            <div className="shrink-0 py-2 lg:py-0">
              <Link href="/">
                <Image src={logo} alt="Logo" height={40} />
              </Link>
            </div>
            <div className="text-white">
              <Sheet>
                <SheetTrigger className="block lg:hidden">
                  <span className="mb-1 block h-[3px] w-7 rounded-md bg-white"></span>
                  <span className="mb-1 block h-[3px] w-7 rounded-md bg-white"></span>
                  <span className="block h-[3px] w-7 rounded-md bg-white"></span>
                </SheetTrigger>
                <SheetContent className="border-none p-0 text-white">
                  <div className="h-full overflow-y-auto p-6">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/">
                          <Image src={logo} alt="Logo" width={100} />
                        </Link>
                      </SheetTitle>
                      <SheetDescription>
                        <ul className="block pt-8 text-left *:text-white lg:hidden lg:gap-4 xl:gap-8">
                          <li className="relative">
                            <SheetClose asChild>
                              <Link
                                href="/"
                                className="relative block border-b border-white py-3 text-white duration-300 ease-in-out after:transition-transform"
                              >
                                Home
                              </Link>
                            </SheetClose>
                          </li>
                          <li className="group relative">
                            <SheetClose asChild>
                              <Link
                                href="/quem-somos"
                                className="relative block border-b border-white py-3 text-white duration-300 ease-in-out after:transition-transform"
                              >
                                Quem Somos
                              </Link>
                            </SheetClose>
                          </li>
                          <li className="group relative">
                            <SheetClose asChild>
                              <Link
                                href="/calculo-atualizacao"
                                className="relative block border-b border-white py-3 text-white duration-300 ease-in-out after:transition-transform"
                              >
                                Cálculo de Atualização
                              </Link>
                            </SheetClose>
                          </li>
                          {
                            /*
                            <li className="relative">
                            <SheetClose asChild>
                              <Link
                                href="/areas-atuacao/"
                                className="relative block border-b border-white py-3 duration-300 ease-in-out after:transition-transform"
                              >
                                Áreas de Atuação
                              </Link>
                            </SheetClose>
                          </li>
                            */
                          }
                          
                          <li className="relative">
                            <Link
                              href="#"
                              className="relative block  border-b border-white py-3 text-white duration-300 ease-in-out after:transition-transform"
                            >
                              <Collapsible>
                                <CollapsibleTrigger>
                                  Membros
                                  <ChevronDown
                                    size="15"
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                  />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <ul
                                    className="top-full z-10 w-full divide-y divide-white rounded-b-lg bg-background transition delay-100 duration-500  ease-menu"
                                    role="list"
                                  >
                                    <li>
                                      <SheetClose asChild>
                                        <Link
                                          href="/clebia-souza-costa/"
                                          className="group/subItem relative block px-5 py-4 pb-1 transition-all hover:pl-7 hover:text-primary-main"
                                        >
                                          <ChevronRight
                                            size="15"
                                            className="absolute left-0 top-[17px] opacity-0 group-hover/subItem:left-[10px] group-hover/subItem:opacity-100 group-hover/subItem:transition group-hover/subItem:delay-100 group-hover/subItem:duration-300 group-hover/subItem:ease-menu"
                                          />
                                         Clêbia Souza Costa
                                        </Link>
                                      </SheetClose>
                                    </li>
                                  </ul>
                                </CollapsibleContent>
                              </Collapsible>
                            </Link>
                          </li>
                          {
                            /*
                            <li className="relative">
                            <SheetClose asChild>
                              <Link
                                href="/blog/"
                                className="relative block border-b border-white py-3 duration-300 ease-in-out after:transition-transform"
                              >
                                Blog
                              </Link>
                            </SheetClose>
                          </li>
                            */
                          }
                          
                          <li className="group relative">
                            <SheetClose asChild>
                              <Link
                                href="/contato/"
                                className="relative block border-b border-white py-3 duration-300 ease-in-out after:transition-transform"
                              >
                                Contato
                              </Link>
                            </SheetClose>
                          </li>
                        </ul>
                      </SheetDescription>
                    </SheetHeader>
                  </div>
                </SheetContent>
              </Sheet>
              <nav>
                <ul className="hidden lg:flex lg:gap-4 xl:gap-8">
                  <li className="group">
                    <Link
                      href="/"
                      className="relative block py-5 pr-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      href="/quem-somos"
                      className="relative block py-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Quem Somos
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      href="/calculo-atualizacao"
                      className="relative block py-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Cálculo de Atualização
                    </Link>
                  </li>
                  {
                    /*
                     <li className="group">
                    <Link
                      href="/areas-atuacao/"
                      className="relative block py-5 pr-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Áreas de Atuação
                    </Link>
                  </li>
                    */
                  }
                 
                  <li className="group">
                    <Link
                      href="#"
                      className="relative block py-5 pr-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Membros
                      <ChevronDown
                        size="15"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                      />
                    </Link>
                    <ul
                      className="absolute top-full z-10 origin-top-left scale-y-0 divide-y divide-[#29374a] rounded-b-lg bg-background opacity-0 transition delay-100 duration-500 ease-menu group-hover:scale-y-100 group-hover:opacity-100  lg:min-w-52"
                      role="list"
                    >
                      <li>
                        <Link
                          href="/clebia-souza-costa/"
                          className="group/subItem relative block px-5 py-4 transition-all hover:pl-7 hover:text-primary-main"
                        >
                          <ChevronRight
                            size="15"
                            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/subItem:left-[10px] group-hover/subItem:opacity-100 group-hover/subItem:transition group-hover/subItem:delay-100 group-hover/subItem:duration-300 group-hover/subItem:ease-menu"
                          />
                          Clêbia Souza Costa
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/*
                  <li className="group relative">
                    <Link
                      href="/blog/"
                      className="relative block py-5 pr-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Blog
                    </Link>
                  </li>
                  */}
                  
                  <li className="group relative">
                    <Link
                      href="/contato/"
                      className="relative block py-5 duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:content-[''] group-hover:after:scale-x-100"
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
