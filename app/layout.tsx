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
          _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"floatingPreferencesButtonDisplay":"bottom-right","perPurposeConsent":true,"siteId":3400480,"whitelabel":false,"cookiePolicyId":50674664,"lang":"it", "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#0073CE","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","closeButtonRejects":true,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-right","textColor":"#000000" }}`,
        }}
      />
      <Script
        id="iub2"
        type="text/javascript"
        src="https://cs.iubenda.com/autoblocking/3400480.js"
      />
      <Script
        id="iub4"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/beta/iubenda_cs.js"
        async
      />
    </html>
  );
}
