"use client";

import { useEffect, useState } from "react";
import { HomeContent, defaultHomeContent } from "@/app/lib/cms/homeContent";
import { fetchHomeContent } from "@/app/lib/supabase/rest";

export function useSiteContent() {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    fetchHomeContent()
      .then((data) => {
        if (alive) {
          setContent(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (alive) {
          setContent(defaultHomeContent);
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { content, setContent, loading, error };
}
