import type { Metadata } from "next";
import DemoApp from "./_components/DemoApp";

export const metadata: Metadata = {
  title: "Floq — Demo interactivo",
  description: "Demo en vivo de cercado virtual y monitoreo de hato para ganaderos.",
};

export default function DemoPage() {
  return <DemoApp />;
}
