"use client";

import React from "react";

export default function HookPullSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  index?: number;
}) {
  return <div className={className}>{children}</div>;
}
