import React from "react";

export type SocialIconKey =
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "x"
  | "whatsapp"
  | "behance"
  | "website";

export const socialIconOptions: { value: SocialIconKey; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X / Twitter" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "behance", label: "Behance" },
  { value: "website", label: "Website" },
];

export function guessSocialIcon(value?: string): SocialIconKey {
  const text = String(value || "").toLowerCase();

  if (text.includes("facebook") || text.includes("fb")) return "facebook";
  if (text.includes("instagram") || text.includes("insta") || text.includes("ig")) return "instagram";
  if (text.includes("youtube") || text.includes("youtu")) return "youtube";
  if (text.includes("tiktok") || text.includes("tik")) return "tiktok";
  if (text.includes("linkedin") || text.includes("li")) return "linkedin";
  if (text.includes("twitter") || text.includes("x.com") || text === "x") return "x";
  if (text.includes("whatsapp") || text.includes("wa.me")) return "whatsapp";
  if (text.includes("behance") || text.includes("be")) return "behance";

  return "website";
}

export function SocialIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon?: SocialIconKey | string;
  className?: string;
}) {
  const key = (icon || "website") as SocialIconKey;

  if (key === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M14.2 8.35V6.9c0-.7.18-1.08 1.12-1.08h1.4V3.2A18.3 18.3 0 0 0 14.68 3c-2.02 0-3.4 1.23-3.4 3.5v1.85H9v2.94h2.28V21h2.92v-9.7h2.28l.36-2.95h-2.64Z" />
      </svg>
    );
  }

  if (key === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (key === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a3 3 0 0 0-2.1-2.12C17.65 4.58 12 4.58 12 4.58s-5.65 0-7.5.5A3 3 0 0 0 2.4 7.2 31.3 31.3 0 0 0 1.9 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c1.85.5 7.5.5 7.5.5s5.65 0 7.5-.5a3 3 0 0 0 2.1-2.12 31.3 31.3 0 0 0 .5-4.8 31.3 31.3 0 0 0-.5-4.8ZM10 15.55v-7.1L16 12l-6 3.55Z" />
      </svg>
    );
  }

  if (key === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M16.6 3c.35 2.35 1.68 3.75 4.02 3.9v3.02a7.1 7.1 0 0 1-4-1.25v5.92c0 3.55-2.2 6.02-5.65 6.02-3.06 0-5.55-2.05-5.55-5.08 0-3.42 2.88-5.52 6.22-4.82v3.15c-1.55-.48-3.02.32-3.02 1.68 0 1.22 1.02 2.02 2.25 2.02 1.45 0 2.45-.82 2.45-2.82V3h3.28Z" />
      </svg>
    );
  }

  if (key === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M6.45 8.7H3.3V21h3.15V8.7ZM4.88 3A1.83 1.83 0 1 0 4.9 6.66 1.83 1.83 0 0 0 4.88 3ZM20.7 14.05c0-3.3-1.76-5.62-4.8-5.62-1.82 0-3.04 1-3.54 1.95V8.7H9.34V21h3.15v-6.22c0-1.64.32-3.24 2.35-3.24 2 0 2.03 1.88 2.03 3.35V21h3.83v-6.95Z" />
      </svg>
    );
  }

  if (key === "x") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </svg>
    );
  }

  if (key === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12.02 3C7.08 3 3.06 6.86 3.06 11.6c0 1.52.42 3 .12 4.3L2 21l5.35-1.12a9.3 9.3 0 0 0 4.67 1.22c4.94 0 8.96-3.86 8.96-8.6S16.96 3 12.02 3Zm0 15.62a6.9 6.9 0 0 1-3.72-1.06l-.27-.16-3.18.66.68-2.95-.18-.3a6.16 6.16 0 0 1-.98-3.21c0-3.36 2.86-6.1 6.38-6.1s6.38 2.74 6.38 6.1-2.86 7.02-6.38 7.02Zm3.5-4.58c-.2-.1-1.15-.55-1.33-.62-.18-.07-.31-.1-.44.1-.13.2-.5.62-.62.75-.11.13-.23.15-.42.05-.2-.1-.82-.3-1.56-.94-.58-.5-.97-1.12-1.08-1.3-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.34.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.02-.6-1.4-.16-.37-.32-.32-.44-.33h-.37c-.13 0-.34.05-.52.25-.18.2-.68.65-.68 1.58 0 .93.7 1.84.8 1.97.1.13 1.38 2.04 3.35 2.85.47.2.83.31 1.11.4.47.14.9.12 1.24.07.38-.06 1.15-.45 1.31-.88.16-.43.16-.8.11-.88-.05-.08-.18-.13-.38-.22Z" />
      </svg>
    );
  }

  if (key === "behance") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M3 5.4h6.1c2.2 0 3.7 1.15 3.7 3.05 0 1.18-.55 2.02-1.58 2.5 1.42.42 2.13 1.48 2.13 3.03 0 2.23-1.72 3.62-4.38 3.62H3V5.4Zm5.68 5.02c1.02 0 1.63-.5 1.63-1.35 0-.82-.6-1.28-1.68-1.28H5.55v2.63h3.13Zm.12 4.75c1.25 0 1.95-.58 1.95-1.58 0-.98-.68-1.52-1.98-1.52H5.55v3.1H8.8ZM15.35 6.38h5.18v1.45h-5.18V6.38Zm2.72 3.3c2.74 0 4.4 1.92 4.2 4.88h-6.02c.12 1.12.78 1.78 1.9 1.78.75 0 1.32-.3 1.63-.82h2.28c-.67 1.6-2.05 2.45-3.98 2.45-2.72 0-4.35-1.7-4.35-4.15 0-2.43 1.72-4.14 4.34-4.14Zm1.75 3.36c-.16-1.03-.75-1.62-1.75-1.62-.97 0-1.6.58-1.78 1.62h3.53Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </svg>
  );
}
