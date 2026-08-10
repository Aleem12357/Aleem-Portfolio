import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ReachOutDialog } from "./ReachOutDialog";
import { SiteLoader } from "./SiteLoader";
import { TourGuideBot } from "./TourGuideBot";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteLoader />
      <Nav />
      <main className="pt-28">{children}</main>
      <Footer />
      <ReachOutDialog />
      <TourGuideBot />
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  italic,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  italic?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-16 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-10 text-center">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          {title && (
            <h2 className="mt-3 text-4xl md:text-5xl">
              {title} {italic && <span className="ital-grad">{italic}</span>}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
