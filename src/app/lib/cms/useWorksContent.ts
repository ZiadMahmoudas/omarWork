"use client";

import { useEffect, useState } from "react";
import { WorksContent, defaultWorksContent } from "@/app/lib/cms/worksContent";
import { fetchWorksContent } from "@/app/lib/supabase/rest";

export function useWorksContent() {
  const [content, setContent] = useState<WorksContent>(defaultWorksContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchWorksContent()
      .then((data) => {
        if (alive) {
          setContent(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (alive) {
          setContent(defaultWorksContent);
          setError(err instanceof Error ? err.message : "Failed to load works content");
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
