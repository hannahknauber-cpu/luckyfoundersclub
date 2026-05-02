import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-secondary">
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:gap-8">
          <Link href="/" className="block shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
            <Image
              src="/LFC_Logo_Colored_Sand.png"
              alt="Lucky Founders Club"
              width={480}
              height={160}
              className="h-16 w-auto object-contain sm:h-20 md:h-24 lg:h-28"
              priority
            />
          </Link>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
            Gründer*innenstories aus Stuttgart
          </h1>
          <p className="max-w-2xl font-medium text-lg text-muted-foreground sm:text-lg md:text-xl">
            Exklusive Community für kreative Founder. Erzähle deine
            Gründungsgeschichte, vernetze dich und lerne von den Besten!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="h-12 text-base sm:h-10">
              <Link href="/apply">Join the club.</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 pt-2 sm:gap-4 sm:pt-4">
            <a
              href="https://www.instagram.com/luckyfounders.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground active:scale-95"
              aria-label="Instagram"
            >
              <Instagram className="size-6" />
            </a>
          </div>
          <div className="mt-2 flex items-center gap-3 sm:gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              Gefördert von
            </p>
            <Image
              src="/STUTTGART%20mit%20Pferd.png"
              alt="Stuttgart Logo"
              width={220}
              height={56}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}