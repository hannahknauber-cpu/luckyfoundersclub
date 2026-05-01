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
  {
    id: 2,
    question: "Was ist dein Business bzw. deine Business-Idee?",
    description: "Beschreibe kurz, was du aufbaust.",
  },
  {
    id: 3,
    question: "Möchtest du Teil der Interview-Serie auf Instagram sein?",
    description: "Wähle Ja oder Nein.",
  },
  {
    id: 4,
    question: "Unter welcher E-Mail-Adresse können wir dich erreichen?",
    description: "Deine Kontaktadresse.",
  },
  {
    id: 5,
    question: "Welche Themen im Bereich Gründung interessieren dich?",
    description: "Teile uns deine Interessen mit.",
  },
] as const;

const INTERVIEW_OPTIONS = [
  { label: "Ja, gerne", value: "ja" },
  { label: "Nein, danke", value: "nein" },
] as const;

const TOTAL_STEPS = 5;

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    business: "",
    interviewSeries: "",
    email: "",
    interests: "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (step < TOTAL_STEPS) {
      next();
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Deine Bewerbung konnte gerade nicht gesendet werden. Bitte versuche es gleich nochmal."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                className="h-20 w-auto object-contain sm:h-24 md:h-28 lg:h-32"
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
              className="h-28 w-auto object-contain sm:h-28 md:h-28 lg:h-28"
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
            <Textarea
              id="business"
              rows={5}
              placeholder="Erzähl uns von deinem Business oder deiner Idee..."
              value={form.business}
              onChange={(e) => update("business", e.target.value)}
              required
              className={textareaClass}
            />
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid gap-3">
                {INTERVIEW_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => update("interviewSeries", option.value)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-white/20",
                      form.interviewSeries === option.value
                        ? "border-white bg-white/20 ring-2 ring-white/50"
                        : "border-white bg-white/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
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

          {step === 5 && (
            <div className="space-y-6">
              <Textarea
                id="interests"
                rows={5}
                placeholder="z. B. Community, Finanzierung, Personal Branding, Growth..."
                value={form.interests}
                onChange={(e) => update("interests", e.target.value)}
                required
                className={textareaClass}
              />
            </div>
          )}

          {submitError ? (
            <p className="text-sm text-white bg-white/10 border border-white/30 rounded-md px-3 py-2">
              {submitError}
            </p>
          ) : null}

          <div className="grid grid-cols-2 gap-3 w-full pt-4 sm:flex sm:justify-between sm:items-center sm:gap-4">
            {step === 1 ? (
              <span className="hidden sm:block" aria-hidden />
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={prev}
                disabled={isSubmitting}
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
                  disabled={isSubmitting || (step === 3 && !form.interviewSeries)}
                >
                  {isSubmitting ? "Sende..." : "Weiter"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-md bg-secondary text-black hover:bg-secondary/90 text-base sm:h-10 sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sende..." : "Bewerbung absenden"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
