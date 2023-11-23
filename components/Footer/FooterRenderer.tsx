import Image from "next/image";
import Link from "next/link";
import SvgRenderer from "../Common/SvgRenderer";
import {
  ChangeLogRecord,
  FooterQuery,
  LegalPageRecord,
  SiteLocale,
} from "@/graphql/generated";
import { notFound } from "next/navigation";
import { primaryColor } from "@/app/i18n/settings";
import ReactMarkdown from "react-markdown";

type Props = {
  data: FooterQuery;
  lng: SiteLocale;
};

const Footer = ({ data, lng }: Props) => {
  return (
    <footer className="color-white relative z-10 mx-auto flex w-full flex-col items-center justify-center bg-black pt-16 text-center md:text-start lg:pt-24">
      <div className="container w-full">
        <div className="flex w-full flex-col justify-between md:flex-row md:px-16">
          <div className="w-full">
            <div className="mx- mb-12 lg:mb-16">
              <Link href={"/" + lng + "/home"} className="mb-8 inline-block">
                {data.layout?.footerLogo && (
                  <Image
                    src={data.layout.footerLogo.url}
                    alt="logo"
                    className="w-full"
                    width={data.layout.footerLogo.width || 100}
                    height={data.layout.footerLogo.height || 100}
                  />
                )}
              </Link>
              <div className="mb-9 text-base font-medium leading-relaxed text-body-color">
                <ReactMarkdown>
                  {data.layout!.footerSubtitle || ""}
                </ReactMarkdown>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                {data.layout!.socialMediaLinks.map((socialMedia) => {
                  return (
                    <a
                      href={socialMedia.url}
                      aria-label="social-link"
                      className="mr-6 text-[#CED3F6] hover:text-primary"
                      key={socialMedia.id}
                    >
                      <SvgRenderer url={socialMedia.icon.url} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex w-full text-white md:text-end">
            <div className="w-full">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 font-bold text-xl uppercase tracking-widest">
                  Contatti
                </h2>
                <ul>
                  <li className="mb-4 inline-block text-base tracking-wider text-white hover:text-yellow">
                    Telefono: 3333333333
                  </li>
                  <li>
                    <a
                      href="mailto:info@millenovecentoquattro.it"
                      className="mb-4 inline-block text-base tracking-wider text-white underline hover:text-yellow"
                    >
                      info@millenovecentoquattro.it
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-full md:text-end">
            <div className="w-full">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 font-bold text-xl uppercase tracking-widest text-white">
                  Legal
                </h2>
                <ul>
                  <li>
                    <a
                      href="#"
                      className="mb-4 inline-block text-base tracking-wider text-white underline hover:text-yellow"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="mb-4 inline-block text-base tracking-wider text-white underline hover:text-yellow"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
