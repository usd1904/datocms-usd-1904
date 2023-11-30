import "node_modules/react-modal-video/css/modal-video.css";
import "@/styles/global.css";
import { SiteLocale } from "@/graphql/generated";
import getAvailableLocales from "@/app/i18n/settings";
import Head from "./[lng]/Head";
import Script from "next/script";

type Params = {
  children: React.ReactNode;
  params: {
    lng: SiteLocale;
  };
};

export async function generateStaticParams() {
  const languages = await getAvailableLocales();
  return languages.map((language) => {
    language;
  });
}

export default async function RootLayout({
  children,
  params: { lng },
}: Params) {
  return (
    <html lang={lng}>
      <Head />
      <body className={`tracking-tight antialiased`}>{children}</body>
      <Script
        id="iubenda"
        dangerouslySetInnerHTML={{
          __html: `
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "askConsentAtCookiePolicyUpdate":true,
              "lang":"it",
              "perPurposeConsent":true,
              "siteId":3400480,
              "cookiePolicyId":50674664,
              "countryDetection":true,
              "enableUspr":true,
              purposes: "1, 3, 4",
              "banner":{
                "prependOnBody":true,
                "acceptButtonCaptionColor":"#000000",
                "acceptButtonColor":"#FFFFFF",
                "acceptButtonDisplay":true,
                "closeButtonRejects":true,
                "customizeButtonCaptionColor":"#000000",
                "customizeButtonColor":"#FFFFFF",
                "customizeButtonDisplay":true,
                "explicitWithdrawal":true,
                "listPurposes":true,
                "position":"float-bottom-center",
                "rejectButtonCaptionColor":"#000000",
                "rejectButtonColor":"#FFFFFF",
                "rejectButtonDisplay":true,
                "showPurposesToggles":true
              }
            }`,
        }}
      />
      <Script
        id="iub2"
        type="text/javascript"
        src="https://cs.iubenda.com/autoblocking/3400480.js"
      />
      <Script
        id="iub3"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/gpp/stub.js"
      />
      <Script
        id="iub4"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        async
      />
    </html>
  );
}
