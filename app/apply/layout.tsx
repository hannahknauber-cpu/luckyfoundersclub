import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bewerben",
  description:
    "Bewirb dich für den Lucky Founders Club. Fülle das Bewerbungsformular aus und werde Teil der Gründer-Community aus Stuttgart.",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
