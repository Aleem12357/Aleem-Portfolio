import { useState } from "react";
import { MessageSquare, X, Send, Bot, ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import aleemLogo from "@/assets/aleem-logo.png";
import { profile } from "@/data/portfolio";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: () => void }[];
  link?: { label: string; href: string; isExternal?: boolean };
};

export function TourGuideBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [input, setInput] = useState("");

  const initialBotMsg: Message = {
    id: "welcome",
    sender: "bot",
    text: "Hi there! 👋 I'm Aleem's AI Tour Guide. What would you like to explore today?",
    options: [
      { label: "🚀 Show Top Projects", action: () => handleSelectOption("projects") },
      { label: "💼 Work Experience", action: () => handleSelectOption("experience") },
      { label: "📜 Certificates & Degree", action: () => handleSelectOption("certificates") },
      { label: "💬 WhatsApp & Contact", action: () => handleSelectOption("contact") },
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMsg]);

  function handleSelectOption(type: "projects" | "experience" | "certificates" | "contact") {
    let userText = "";
    let botResponse: Message = { id: Date.now().toString(), sender: "bot", text: "" };

    if (type === "projects") {
      userText = "Show me Aleem's top projects";
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Aleem has shipped 12+ full-stack projects! Highlights include Digital Diary (AI school portal, 3rd place FYP), Veamkodrive (Oman client dealership), Unitrix, Bytely, and PassOP.",
        link: { label: "Explore All Work Case Studies", href: "/work" },
      };
    } else if (type === "experience") {
      userText = "Tell me about Aleem's experience";
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Aleem is a Lab Instructor at UCP, Associate Business Developer at Zweidevs, former TA for OOP Lab, Jr Web Developer at Byte Force IT, and Freelance Full-Stack Developer.",
        link: { label: "View About & Work History", href: "/about" },
      };
    } else if (type === "certificates") {
      userText = "What certificates & credentials does he have?";
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Aleem holds a BS in Software Engineering from UCP with a 3.95 CGPA, CS50 Python (Harvard), C++ Data Structures (Coursera), Meta HTML/CSS, and 15+ verified credentials.",
        link: { label: "View Certificate Gallery", href: "/certificates" },
      };
    } else if (type === "contact") {
      userText = "How can I contact Aleem directly?";
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `You can email Aleem at ${profile.email} or message him directly on WhatsApp at +92 315 5196967.`,
        link: { label: "Open WhatsApp Chat", href: profile.whatsapp, isExternal: true },
      };
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: userText },
      botResponse,
    ]);
  }

  function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };

    let replyText = "I'd be glad to help! Feel free to check out Aleem's portfolio pages or reach out directly on WhatsApp.";
    let link: Message["link"] = { label: "Get in touch", href: "/contact" };

    const lower = userText.toLowerCase();
    if (lower.includes("project") || lower.includes("work") || lower.includes("build") || lower.includes("repo")) {
      replyText = "Aleem specializes in React, Next.js, Vue, Node, Python and Supabase. You can review all project case studies on the Work page.";
      link = { label: "View Projects", href: "/work" };
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp") || lower.includes("hire")) {
      replyText = `You can email Aleem at ${profile.email} or message him directly on WhatsApp at +92 315 5196967.`;
      link = { label: "Open WhatsApp Chat", href: profile.whatsapp, isExternal: true };
    } else if (lower.includes("about") || lower.includes("gpa") || lower.includes("degree") || lower.includes("education") || lower.includes("ucp")) {
      replyText = "Aleem is a Lab Instructor at UCP, Associate Business Developer at Zweidevs, and Software Engineer.";
      link = { label: "About Aleem", href: "/about" };
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: replyText,
      link,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Welcome Prompt Tooltip */}
      {showPrompt && !isOpen && (
        <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/85 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md animate-bounce">
          <Sparkles className="size-4 text-[#22d3ee]" />
          <span>👋 Need a quick tour of Aleem's portfolio?</span>
          <button
            onClick={() => setShowPrompt(false)}
            className="ml-1 text-gray-400 hover:text-white"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowPrompt(false);
          }}
          className="group relative flex size-14 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#091522] text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform duration-300 hover:scale-110"
          aria-label="Open Tour Guide"
        >
          <img
            src={aleemLogo}
            alt="Tour Guide Bot"
            className="size-8 object-contain transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#22d3ee] text-[0.6rem] font-bold text-black">
            AI
          </span>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="relative flex h-[30rem] w-[22rem] flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#091522]/95 shadow-2xl backdrop-blur-xl sm:w-[25rem]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1d2d] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-surface">
                <img src={aleemLogo} alt="" className="size-6 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display text-base text-white">
                  Aleem's Tour Guide <Bot className="size-4 text-[#22d3ee]" />
                </div>
                <div className="font-mono text-[0.6rem] text-emerald-400">● Online Portfolio Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/10 p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#22d3ee] text-black font-medium"
                      : "bg-surface-2 border border-white/10 text-white/90"
                  }`}
                >
                  {m.text}
                </div>

                {/* Option Buttons */}
                {m.options && (
                  <div className="mt-3 flex flex-col gap-2 w-full">
                    {m.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={opt.action}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left font-mono text-[0.7rem] text-gray-200 transition-colors hover:border-[#22d3ee]/60 hover:bg-[#22d3ee]/10 hover:text-[#22d3ee]"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="size-3" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Deep Link Button */}
                {m.link && (
                  <div className="mt-2">
                    {m.link.isExternal ? (
                      <a
                        href={m.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/20 px-3.5 py-1.5 font-mono text-[0.7rem] text-[#22d3ee] transition-colors hover:bg-[#22d3ee] hover:text-black font-medium"
                      >
                        {m.link.label} <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <Link
                        to={m.link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/20 px-3.5 py-1.5 font-mono text-[0.7rem] text-[#22d3ee] transition-colors hover:bg-[#22d3ee] hover:text-black font-medium"
                      >
                        {m.link.label} <ChevronRight className="size-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-white/10 bg-[#0d1d2d] p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-white/10 bg-surface-2 px-4 py-2 text-xs text-white outline-none placeholder:text-gray-400 focus:border-[#22d3ee]/60"
            />
            <button
              type="submit"
              className="flex size-9 items-center justify-center rounded-full bg-[#22d3ee] text-black transition-transform hover:scale-105"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
