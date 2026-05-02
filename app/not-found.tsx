import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 py-24 text-center">
      <Link
        href="/"
        className="mb-8 block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        <Image
          src="/LFC_Logo_Colored_Sand.png"
          alt="Lucky Founders Club"
          width={480}
          height={160}
          className="h-14 w-auto object-contain sm:h-16"
        />
      </Link>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Button asChild size="lg" className="mt-8 text-base">
        <Link href="/">Zur Startseite</Link>
      </Button>
    </div>
  );
}
