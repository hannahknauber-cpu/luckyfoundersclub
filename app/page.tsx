import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
          <Badge variant="secondary" className="text-sm">
            Lucky Founders Club
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Wo Gründer auf ihr Glück treffen
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Exklusive Community für ambitionierte Founder. Vernetze dich, lerne
            von den Besten und baue gemeinsam etwas Großes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="text-base">
              Jetzt bewerben
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
