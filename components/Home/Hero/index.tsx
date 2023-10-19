"use client";

import Image from "next/image";
import { primaryColor } from "@/app/i18n/settings";
import { ButtonRecord } from "@/graphql/generated";
import { useScroll, useTransform, motion } from "framer-motion";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  heroTitle: string;
  heroSubtitle: Maybe<string>;
  buttons: ButtonRecord[];
};

const Hero = ({ heroTitle, heroSubtitle, buttons }: Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-black pb-16 pt-[120px] text-white md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="mb-5 font-bold text-3xl leading-tight dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                    {heroTitle}
                  </h2>
                  <div className="mb-12 text-base font-medium !leading-relaxed dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                    <ReactMarkdown>{heroSubtitle || ""}</ReactMarkdown>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                  {buttons.map((button) => {
                    const primary = "bg-white text-black hover:bg-primary";
                    const secondary =
                      "bg-black/20 hover:bg-black/30 text-black";
                    return (
                      <Link
                        key={button.id}
                        href={button.url || "#"}
                        style={{
                          backgroundColor: button.primary ? primary : secondary,
                        }}
                        className={
                          "text-bold rounded-md px-8 py-4 text-base font-semibold uppercase tracking-widest duration-300 ease-in-out hover:text-white " +
                          (button.primary ? primary : secondary)
                        }
                        id={button.id}
                      >
                        {button.label}
                      </Link>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
