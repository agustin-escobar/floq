import type { Metadata } from "next";
import { Roboto_Flex, DM_Sans } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Floq — Ganadería inteligente para Latinoamérica",
  description:
    "Cercado virtual y monitoreo de bienestar animal con IA. La próxima generación del manejo ganadero en Chile y Latinoamérica.",
  openGraph: {
    title: "Floq — Ganadería inteligente para Latinoamérica",
    description:
      "Cercado virtual y monitoreo de bienestar animal con IA. La próxima generación del manejo ganadero en Chile y Latinoamérica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${robotoFlex.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
