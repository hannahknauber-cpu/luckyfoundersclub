import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
          <Link href="/" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Image
              src="/Luckyfounderclub.png"
              alt="Lucky Founders Club"
              width={220}
              height={80}
              className="h-16 w-auto object-contain sm:h-20"
              priority
            />
          </Link>
          <h1 className="text-8xl font-bold tracking-tight sm:text-8xl md:text-8xl">
          Gründer*innenstories aus Stuttgart
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Exklusive Community für ambitionierte Founder. Vernetze dich, lerne
            von den Besten und baue gemeinsam etwas Großes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link href="/apply">Jetzt bewerben</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base border-white hover:bg-[var(--brand-cream)]"
            >
              Mehr erfahren
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://instagram.com/luckyfoundersclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="size-6" />
            </a>
            <a
              href="https://linkedin.com/company/luckyfoundersclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}