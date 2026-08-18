import { createFileRoute } from "@tanstack/react-router";
import { Award, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { PageShell, Section } from "@/components/site/PageShell";
import { certificates, type Certificate } from "@/data/portfolio";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates & Credentials — Muhammad Aleem" },
      {
        name: "description",
        content:
          "Professional certifications and academic honors earned by Muhammad Aleem, including Harvard CS50 Python, UIUC Data Structures, Meta HTML/CSS, and UCP Teaching Awards.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Aleem Certificates, Harvard CS50 Python, Coursera UIUC, DigiSkills Certificates, UCP Teaching Assistant Certificate",
      },
      { property: "og:title", content: "Certificates & Achievements — Muhammad Aleem" },
      {
        property: "og:description",
        content: "Verified certifications, course completions, and academic competition awards.",
      },
      { property: "og:url", content: "https://aleemstack.dev/certificates" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://aleemstack.dev/certificates" }],
  }),
  component: Certificates,
});

function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <PageShell>
      <Section eyebrow="Credentials" title="Certificates &" italic="achievements">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <article
              key={c.title}
              onClick={() => c.image && setSelectedCert(c)}
              className={`panel group overflow-hidden transition-all duration-300 ${
                c.image ? "cursor-pointer hover:border-brand/40 hover:shadow-lg" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {c.image ? (
                  <>
                    <img
                      src={c.image}
                      alt={`${c.title} certificate issued by ${c.issuer}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs text-white backdrop-blur-md">
                        <ZoomIn className="size-3.5" /> View Certificate
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Award className="size-8" />
                    <span className="font-mono text-[0.65rem] tracking-[0.2em]">CERTIFICATE</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-lg font-medium leading-snug transition-colors group-hover:text-brand">
                  {c.title}
                </h2>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {c.issuer} · {c.year}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white transition-colors hover:bg-black/90"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
            <div className="max-h-[75vh] overflow-auto p-2 bg-black/50">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="h-auto w-full max-w-full rounded-lg object-contain"
              />
            </div>
            <div className="p-5 border-t border-border bg-surface">
              <h3 className="text-xl font-display text-foreground">{selectedCert.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Issued by {selectedCert.issuer} ({selectedCert.year})
              </p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
