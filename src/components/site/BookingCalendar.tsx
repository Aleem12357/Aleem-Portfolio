import { useMemo, useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SLOTS_12 = [
  "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm",
  "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm",
];

function to24(s: string) {
  const [, h, m, ap] = s.match(/(\d+):(\d+)(am|pm)/)!;
  let hh = Number(h) % 12;
  if (ap === "pm") hh += 12;
  return `${String(hh).padStart(2, "0")}:${m}`;
}

export function BookingCalendar({ compact = false }: { compact?: boolean }) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [fmt24, setFmt24] = useState(false);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isPast = (d: number) => new Date(year, month, d) < startOfToday;
  const isWeekendOff = (d: number) => new Date(year, month, d).getDay() === 0;

  function book(slot: string) {
    if (!selected) return;
    const label = `${DAYS[selected.getDay()]} ${selected.getDate()} ${MONTHS[month]} · ${slot}`;
    const body = encodeURIComponent(
      `Hi Aleem,\n\nI'd like to book a 30 min call on ${label} (Asia/Karachi).\n\nThanks!`,
    );
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      "30 Min Meeting request",
    )}&body=${body}`;
    toast.success(`Requesting ${label}`);
  }

  return (
    <div
      className={`panel grid overflow-hidden ${
        compact ? "md:grid-cols-[1fr_0.85fr]" : "md:grid-cols-[0.7fr_1.3fr_0.8fr]"
      }`}
    >
      {!compact && (
        <div className="border-b border-border p-6 md:border-b-0 md:border-r">
          <div
            className="flex size-9 items-center justify-center rounded-full text-xs text-primary-foreground"
            style={{ background: "var(--gradient-brand)" }}
          >
            MA
          </div>
          <div className="mt-4 text-sm text-muted-foreground">{profile.name}</div>
          <h3 className="mt-1 text-2xl">30 Min Meeting</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CalendarCheck className="size-4" /> Requires confirmation</li>
            <li className="flex items-center gap-2"><Clock className="size-4" /> 30m</li>
            <li className="flex items-center gap-2"><Video className="size-4" /> Google Meet</li>
            <li className="flex items-center gap-2"><Globe className="size-4" /> Asia/Karachi</li>
          </ul>
        </div>
      )}

      <div className="border-b border-border p-5 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-foreground">{MONTHS[month]}</span>{" "}
            <span className="text-muted-foreground">{year}</span>
          </div>
          <div className="flex gap-1">
            <button
              aria-label="Previous month"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label="Next month"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 font-mono text-[0.6rem] tracking-widest text-muted-foreground">
          {DAYS.map((d) => (
            <div key={d} className="py-1 text-center">{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={`e${i}`} />;
            const disabled = isPast(d) || isWeekendOff(d);
            const active = selected?.getDate() === d && selected?.getMonth() === month;
            return (
              <button
                key={d}
                disabled={disabled}
                onClick={() => setSelected(new Date(year, month, d))}
                className={`aspect-square rounded-lg text-sm transition-colors ${
                  disabled
                    ? "text-muted-foreground/35"
                    : active
                      ? "bg-foreground text-background"
                      : "bg-surface-2 text-foreground hover:bg-accent"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {selected ? (
              <>
                <span className="text-foreground">{DAYS[selected.getDay()]}</span>{" "}
                <span className="text-muted-foreground">{selected.getDate()}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Pick a day</span>
            )}
          </div>
          <div className="flex rounded-full bg-surface-2 p-0.5 text-xs">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                onClick={() => setFmt24(v)}
                className={`rounded-full px-2.5 py-1 ${fmt24 === v ? "bg-accent text-foreground" : "text-muted-foreground"}`}
              >
                {v ? "24h" : "12h"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
          {selected ? (
            SLOTS_12.map((s) => (
              <button
                key={s}
                onClick={() => book(s)}
                className="w-full rounded-lg border border-border bg-surface-2 py-2.5 text-sm text-foreground transition-colors hover:border-brand/60 hover:bg-accent"
              >
                {fmt24 ? to24(s) : s}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a date to see available 30 minute slots.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
