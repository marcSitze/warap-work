import { i18n } from "@/i18n-config";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { getDictionary, LocaleType } from "../dictionaries";
import "../globals.css";
import Providers from "./providers";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: LocaleType }>;
}) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const { children } = props;

  return (
    <html lang={params.lang}>
      <head>
        {/* <Script id="google-analytics">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH7ZPQB8');
`}
        </Script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH7ZPQB8"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8Y6FLCNPY0"></Script>
        <Script id="analytics-google">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8Y6FLCNPY0');`}
        </Script>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header dictionary={dictionary} />
            {children}
            <Footer dictionary={dictionary} />
          </div>
          <GoogleAnalytics gaId="GTM-NH7ZPQB8" />
        </Providers>
      </body>
    </html>
  );
}
