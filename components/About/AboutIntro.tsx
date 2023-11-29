"use client";

import {
  AboutIntroModelIntroductionTextField,
  ImageFileField,
} from "@/graphql/generated";
import { isHeading, isParagraph } from "datocms-structured-text-utils";
import { Maybe } from "graphql/jsutils/Maybe";
import {
  Image as DatoImage,
  ResponsiveImageType,
  StructuredText,
  renderNodeRule,
} from "react-datocms";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import Highlighter from "../Common/Highlighter";

type Props = {
  header: string;
  subheader: Maybe<string>;
  images: ImageFileField[];
  introduction: Maybe<AboutIntroModelIntroductionTextField>;
  preHeader: Maybe<string>;
};

const AboutIntro = ({
  header,
  subheader,
  images,
  introduction,
  preHeader,
}: Props) => {
  let [firstWord, ...restOfTheStringArray] = header.split(/\s+/);
  const restOfTheString = restOfTheStringArray.join(" ");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "600%"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mx-auto mt-16 px-4 py-12 sm:max-w-xl md:max-w-full md:px-24 lg:mt-20 lg:max-w-screen-xl lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl"
      >
        <div>
          <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-sm font-semibold uppercase tracking-wider text-primary ">
            {preHeader}
          </p>
        </div>
        {header && (
          <h1 className="mt-2 font-bold font-sans text-3xl uppercase tracking-widest xl:text-5xl">
            {header}
          </h1>
        )}
        <h2 className="mb-6 mt-3 max-w-lg font-bold font-sans text-3xl uppercase leading-none tracking-widest text-gray-900 sm:text-4xl md:mx-auto">
          {restOfTheString}
        </h2>
        <div className="text-base text-gray-700 md:text-lg">
          <ReactMarkdown>{subheader || ""}</ReactMarkdown>
        </div>
      </motion.div>
      <div className="grid max-w-screen-lg gap-8 sm:mx-auto lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 gap-5 shadow-2xl drop-shadow-2xl"
        >
          <div className="relative z-50 col-span-2 h-56 w-full rounded object-cover shadow-lg">
            {
              // I can narrow down the type of the data prop to ResponsiveImageType because i know from
              // Dato's validation that the array will have exactly 3 images
            }
            <DatoImage
              key={images[0].id}
              data={images[0].responsiveImage as ResponsiveImageType}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </div>
          <div className="relative h-48 w-full rounded object-cover shadow-lg">
            <DatoImage
              key={images[1].id}
              data={images[1].responsiveImage as ResponsiveImageType}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </div>
          <div className="relative h-48 w-full rounded object-cover shadow-lg">
            <DatoImage
              key={images[2].id}
              data={images[2].responsiveImage as ResponsiveImageType}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeOut", duration: 0.3, delay: 1 }}
          className="z-0 flex flex-col justify-center"
        >
          {introduction && (
            <StructuredText
              data={introduction.value}
              customNodeRules={[
                renderNodeRule(isHeading, ({ children, key }) => {
                  return (
                    <h3
                      className="mb-2 mt-4 font-bold font-sans text-lg uppercase leading-5 tracking-widest xl:text-xl"
                      key={key}
                    >
                      {children}
                    </h3>
                  );
                }),
                renderNodeRule(isParagraph, ({ children, key }) => {
                  return (
                    <div
                      className="mb-4 text-sm text-body-color xl:text-base"
                      key={key}
                    >
                      {children}
                    </div>
                  );
                }),
              ]}
              renderNode={Highlighter}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutIntro;
