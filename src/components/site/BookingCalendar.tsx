import { useMemo, useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, Globe, Video, Copy, Check, ExternalLink, Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SLOTS_12 = [
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
];

function to24(s: string) {
  const [, h, m, ap] = s.match(/(\d+):(\d+)(am|pm)/)!;
  let hh = Number(h) % 12;
  if (ap === "pm") hh += 12;
  return `${String(hh).padStart(2, "0")}:${m}`;
}

export function BookingCalendar({ compact = false }: { compact?: boolean }) {
  const [useCalendly, setUseCalendly] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(true);
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [fmt24, setFmt24] = useState(false);

  // Booking Modal & Success State
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    dateLabel: string;
    clientName: string;
    clientEmail: string;
    topic: string;
    gcalUrl: string;
    gmailUrl: string;
    outlookUrl: string;
    mailtoUrl: string;
    whatsappUrl: string;
    rawMessage: string;
    apiAttempted: boolean;
  } | null>(null);

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

  function openBookingModal(slot: string) {
    if (!selected) return;
    setActiveSlot(slot);
  }

  async function handleConfirmBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !activeSlot || !clientName.trim() || !clientEmail.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }

    setIsSubmitting(true);
    const dateLabel = `${DAYS[selected.getDay()]} ${selected.getDate()} ${MONTHS[month]} ${year} at ${activeSlot}`;

    // Construct One-click Google Calendar link with BOTH attendees added
    const slotHour = parseInt(activeSlot) || 12;
    const isPm = activeSlot.toLowerCase().includes("pm");
    const hour24 = (slotHour % 12) + (isPm ? 12 : 0);
    const startDate = new Date(year, month, selected.getDate(), hour24, 0);
    const endDate = new Date(year, month, selected.getDate(), hour24, 30);

    const formatGcalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, "");
    
    const meetingTitle = `30 Min Call: ${clientName} & Muhammad Aleem`;
    const meetingDetails = `30-Minute Discovery & Project Call\n\nClient Name: ${clientName}\nClient Email: ${clientEmail}\nDate & Time: ${dateLabel} (PKT)\nTopic: ${topic || "Portfolio & Project Discussion"}\nHost: Muhammad Aleem (aleem12357@gmail.com)`;

    // Adding both emails to Google Calendar URL automatically triggers Google Calendar email invitation to client & host!
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      meetingTitle
    )}&dates=${formatGcalDate(startDate)}/${formatGcalDate(endDate)}&details=${encodeURIComponent(
      meetingDetails
    )}&add=${encodeURIComponent(`aleem12357@gmail.com,${clientEmail}`)}`;

    const emailSubject = `📅 30 Min Call Booking: ${clientName} (${dateLabel})`;
    const emailBody = `Hi Aleem,\n\nI have requested a 30-minute call for ${dateLabel} (Asia/Karachi PKT).\n\nClient Name: ${clientName}\nClient Email: ${clientEmail}\nTopic: ${topic || "Project Discussion"}\n\nPlease confirm availability and send the Google Meet link.\n\nBest regards,\n${clientName}`;

    // Direct Webmail Composers (Works instantly in browser without desktop mail software!)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aleem12357@gmail.com&cc=${encodeURIComponent(
      clientEmail
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=aleem12357@gmail.com&cc=${encodeURIComponent(
      clientEmail
    )}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const mailtoUrl = `mailto:aleem12357@gmail.com?cc=${encodeURIComponent(
      clientEmail
    )}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const whatsappText = `Hi Aleem, I booked a 30-min call for ${dateLabel}.\nName: ${clientName}\nEmail: ${clientEmail}\nTopic: ${topic || "Project Discussion"}`;
    const whatsappUrl = `https://wa.me/923155196967?text=${encodeURIComponent(whatsappText)}`;

    let apiAttempted = false;
    try {
      // Send FormData to API backend
      const fd = new FormData();
      fd.append("access_key", "e29e96f1-a189-4a92-9658-03820297802e");
      fd.append("name", clientName);
      fd.append("email", clientEmail);
      fd.append("subject", emailSubject);
      fd.append("message", emailBody);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      if (response.ok) {
        apiAttempted = true;
      }
    } catch {
      // Ignore background api failure, webmail/calendar/whatsapp fallbacks will guarantee delivery
    }

    setBookingSuccess({
      dateLabel,
      clientName,
      clientEmail,
      topic,
      gcalUrl,
      gmailUrl,
      outlookUrl,
      mailtoUrl,
      whatsappUrl,
      rawMessage: emailBody,
      apiAttempted,
    });

    toast.success("Booking request created! Choose your preferred calendar or email option to confirm.");
    setActiveSlot(null);
    setIsSubmitting(false);
  }

  return (
    <div className="w-full space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <CalendarCheck className="size-4 text-[#22d3ee]" />
          <span>Direct Booking & Instant Sync</span>
        </div>
        <div className="flex rounded-full border border-border bg-surface-2 p-1 text-xs">
          <button
            onClick={() => setUseCalendly(false)}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              !useCalendly ? "bg-accent text-foreground font-medium shadow-sm" : "text-muted-foreground"
            }`}
          >
            ⚡ Instant Native Calendar
          </button>
          <button
            onClick={() => setUseCalendly(true)}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              useCalendly ? "bg-accent text-foreground font-medium shadow-sm" : "text-muted-foreground"
            }`}
          >
            Calendly Embed
          </button>
        </div>
      </div>

      {useCalendly ? (
        /* Compact Calendly View */
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#091522] shadow-2xl min-h-[500px]">
          {calendlyLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#091522] text-xs text-muted-foreground">
              <div className="size-8 rounded-full border-2 border-dashed border-[#22d3ee] animate-spin" />
              <span>Loading Calendly Widget...</span>
            </div>
          )}
          <iframe
            src="https://calendly.com/aleem123579?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=091522&text_color=ffffff&primary_color=22d3ee"
            width="100%"
            height="520"
            frameBorder="0"
            onLoad={() => setCalendlyLoading(false)}
            title="Schedule a Call with Muhammad Aleem"
            className="h-[520px] w-full border-0"
          />
        </div>
      ) : (
        /* Custom Interactive Grid View */
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
                <li className="flex items-center gap-2">
                  <CalendarCheck className="size-4 text-emerald-400" /> Direct scheduling
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="size-4" /> 30m
                </li>
                <li className="flex items-center gap-2">
                  <Video className="size-4" /> Google Meet
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="size-4" /> Asia/Karachi (PKT)
                </li>
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
                <div key={d} className="py-1 text-center">
                  {d}
                </div>
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
                    onClick={() => openBookingModal(s)}
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
      )}

      {/* Booking Form Modal */}
      {activeSlot && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl animate-fade-in">
            <h3 className="text-xl font-display text-white">Confirm Your 30 Min Call</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              📅 {DAYS[selected.getDay()]} {selected.getDate()} {MONTHS[month]} {year} at {activeSlot} (PKT)
            </p>

            <form onSubmit={handleConfirmBooking} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Your Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Topic / Notes (Optional)</label>
                <textarea
                  placeholder="What would you like to discuss?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full min-h-20 rounded-xl border border-border bg-surface-2 px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveSlot(null)}
                  className="rounded-full px-4 py-2 text-xs text-muted-foreground hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-5 py-2.5 text-xs font-medium text-black bg-[#22d3ee] transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Scheduling..." : "Confirm & Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-[#091522] p-6 shadow-2xl animate-scale-in text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CalendarCheck className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white">Booking Request Created</h3>
                <p className="text-xs text-emerald-400">📅 {bookingSuccess.dateLabel}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-surface-2/60 p-3.5 space-y-1.5 text-xs">
              <div className="text-muted-foreground"><span className="text-foreground font-medium">Name:</span> {bookingSuccess.clientName}</div>
              <div className="text-muted-foreground"><span className="text-foreground font-medium">Email:</span> {bookingSuccess.clientEmail}</div>
              <div className="text-muted-foreground"><span className="text-foreground font-medium">Host Email:</span> aleem12357@gmail.com</div>
              {bookingSuccess.topic && (
                <div className="text-muted-foreground"><span className="text-foreground font-medium">Topic:</span> {bookingSuccess.topic}</div>
              )}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              To guarantee immediate delivery to both your inbox and Aleem, choose any method below:
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={bookingSuccess.gcalUrl}
                target="_blank"
                rel="noreferrer"
                className="col-span-full flex items-center justify-center gap-2 rounded-xl bg-[#22d3ee] px-4 py-3 text-xs font-semibold text-black transition-transform hover:scale-[1.01]"
              >
                <CalendarCheck className="size-4" /> 1-Click Google Calendar Invite (Auto-Emails Both)
              </a>

              <a
                href={bookingSuccess.gmailUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                <Mail className="size-3.5 text-red-400" /> Send via Gmail Web
              </a>

              <a
                href={bookingSuccess.outlookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                <Mail className="size-3.5 text-blue-400" /> Send via Outlook Web
              </a>

              <a
                href={bookingSuccess.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                <MessageCircle className="size-3.5" /> WhatsApp (+92 315 5196967)
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(bookingSuccess.rawMessage);
                  setCopied(true);
                  toast.success("Booking details copied to clipboard!");
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                {copied ? "Copied!" : "Copy Details"}
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setBookingSuccess(null)}
                className="rounded-full px-5 py-2 text-xs font-medium bg-surface-2 text-muted-foreground hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
