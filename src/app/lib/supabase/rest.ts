import { HomeContent, mergeHomeContent } from "@/app/lib/cms/homeContent";
import { WorksContent, mergeWorksContent } from "@/app/lib/cms/worksContent";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export type AdminSession = {
  access_token: string;
  refresh_token?: string;
  user?: { id?: string; email?: string };
};

function headers(accessToken?: string, prefer?: string) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function supabaseFetch<T>(path: string, init?: RequestInit & { accessToken?: string; prefer?: string }) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase env vars are missing");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      ...headers(init?.accessToken, init?.prefer),
      ...(init?.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error_description || data?.hint || response.statusText;
    throw new Error(message);
  }

  return data as T;
}

export async function signInAdmin(email: string, password: string) {
  return supabaseFetch<AdminSession>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signOutAdmin(accessToken: string) {
  return supabaseFetch<unknown>("/auth/v1/logout", {
    method: "POST",
    accessToken,
  });
}

export async function fetchHomeContent() {
  if (!isSupabaseConfigured) return mergeHomeContent(null);

  const rows = await supabaseFetch<{ content: Partial<HomeContent> }[]>(
    "/rest/v1/site_content?id=eq.home&select=content&limit=1"
  );

  return mergeHomeContent(rows?.[0]?.content || null);
}

export async function saveHomeContent(content: HomeContent, accessToken: string) {
  return supabaseFetch<{ content: HomeContent }[]>("/rest/v1/site_content", {
    method: "POST",
    accessToken,
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify({ id: "home", content }),
  });
}


export async function fetchWorksContent() {
  if (!isSupabaseConfigured) return mergeWorksContent(null);

  const rows = await supabaseFetch<{ content: Partial<WorksContent> }[]>(
    "/rest/v1/site_content?id=eq.works&select=content&limit=1"
  );

  return mergeWorksContent(rows?.[0]?.content || null);
}

export async function saveWorksContent(content: WorksContent, accessToken: string) {
  return supabaseFetch<{ content: WorksContent }[]>("/rest/v1/site_content", {
    method: "POST",
    accessToken,
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify({ id: "works", content }),
  });
}

export type ContactLead = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
};

export async function createContactLead(lead: ContactLead) {
  if (!isSupabaseConfigured) return null;

  return supabaseFetch<unknown>("/rest/v1/contact_leads", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify(lead),
  });
}
