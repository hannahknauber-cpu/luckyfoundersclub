"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, question: "Wie heißt du?", description: "Dein Name." },
  { id: 2, question: "Wie können wir dich per E-Mail erreichen?", description: "Deine E-Mail-Adresse." },
  { id: 3, question: "LinkedIn-Profil (optional)", description: "Link zu deinem Profil." },
  { id: 4, question: "Name des Startups / Projekts", description: "Wie heißt dein Startup?" },
  { id: 5, question: "Deine Rolle", description: "z. B. Gründer, Co-Founder." },
  { id: 6, question: "Website (optional)", description: "Link zur Website." },
  {
    id: 7,
    question: "Warum möchtest du beim Lucky Founders Club dabei sein?",
    description: "Wähle eine Option oder schreib es in eigenen Worten.",
  },
] as const;

const MOTIVATION_OPTIONS = [
  "Networking mit anderen Gründern",
  "Mentoring & Erfahrungsaustausch",
  "Zugang zu Investoren",
  "Lernen von Best Practices",
  "Gemeinsam wachsen",
  "Sonstiges",
] as const;

const TOTAL_STEPS = 7;

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    startupName: "",
    role: "",
    website: "",
    motivationPreset: "",
    motivation: "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      next();
      return;
    }
    console.log("Bewerbung:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--brand-coral)] px-6 py-12 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-md text-center space-y-8">
          <header>
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <Image
                src="/Luckyfounderclub.png"
                alt="Lucky Founders Club"
                width={200}
                height={72}
                className="h-16 w-auto object-contain sm:h-20 md:h-24 lg:h-28"
              />
            </Link>
          </header>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Danke für deine Bewerbung
            </h1>
            <p className="text-lg text-white/90">
              Bitte bestätige deine E-Mail-Adresse.
            </p>
            <p className="text-sm text-white/80">
              Wir haben dir eine E-Mail geschickt. Klicke auf den Link in der
              E-Mail, um deine Anmeldung abzuschließen.
            </p>
          </div>
          <Button asChild className="rounded-xl bg-secondary text-white hover:bg-secondary/90">
            <Link href="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </div>
    );
  }

  const inputClass =
    "h-14 rounded-xl border-white bg-white/10 text-lg text-white placeholder:text-white/60 focus-visible:border-white focus-visible:ring-white/50";
  const textareaClass =
    "min-h-40 rounded-xl border-white bg-white/10 text-lg text-white placeholder:text-white/60 focus-visible:border-white focus-visible:ring-white/50 resize-none";

  return (
    <div className="min-h-screen bg-[var(--brand-coral)] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Image
              src="/Luckyfounderclub.png"
              alt="Lucky Founders Club"
              width={200}
              height={72}
              className="h-32 w-auto object-contain sm:h-14"
            />
          </Link>
        </header>

        <div className="mb-10">
          <p className="mb-3 text-center text-sm text-white">
            Schritt {step} von {TOTAL_STEPS}
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  i + 1 <= step ? "bg-white" : "bg-white/30"
                )}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {STEPS[step - 1].question}
            </h1>
            <p className="mt-2 text-white/90">
              {STEPS[step - 1].description}
            </p>
          </div>

          {step === 1 && (
            <Input
              id="name"
              placeholder="Max Mustermann"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className={inputClass}
            />
          )}

          {step === 2 && (
            <Input
              id="email"
              type="email"
              placeholder="max@beispiel.de"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              className={inputClass}
            />
          )}

          {step === 3 && (
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              className={inputClass}
            />
          )}

          {step === 4 && (
            <Input
              id="startupName"
              placeholder="Mein Startup GmbH"
              value={form.startupName}
              onChange={(e) => update("startupName", e.target.value)}
              required
              className={inputClass}
            />
          )}

          {step === 5 && (
            <Input
              id="role"
              placeholder="z. B. Gründer, Co-Founder"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              required
              className={inputClass}
            />
          )}

          {step === 6 && (
            <Input
              id="website"
              type="url"
              placeholder="https://..."
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputClass}
            />
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div className="grid gap-3">
                {MOTIVATION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => update("motivationPreset", option)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-white/20",
                      form.motivationPreset === option
                        ? "border-white bg-white/20 ring-2 ring-white/50"
                        : "border-white bg-white/10"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <Textarea
                id="motivation"
                rows={5}
                placeholder="Oder beschreibe deine Motivation in eigenen Worten..."
                value={form.motivation}
                onChange={(e) => update("motivation", e.target.value)}
                required={!form.motivationPreset}
                className={textareaClass}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 w-full pt-4 sm:flex sm:justify-between sm:items-center sm:gap-4">
            {step === 1 ? (
              <span className="hidden sm:block" aria-hidden />
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={prev}
                className="h-12 w-full rounded-md border-white text-white bg-transparent hover:bg-white/10 text-base sm:h-10 sm:w-auto"
              >
                Zurück
              </Button>
            )}
            <div className={cn("col-start-2 sm:col-auto", step === 1 && "col-start-1 col-span-2")}>
              {step < TOTAL_STEPS ? (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-md bg-secondary text-black hover:bg-secondary/90 text-base sm:h-10 sm:w-auto"
                >
                  Weiter
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-md bg-secondary text-black hover:bg-secondary/90 text-base sm:h-10 sm:w-auto"
                >
                  Bewerbung absenden
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
