"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { LocaleCode } from "@/lib/portfolio-data";

type ConnectionLevel = "checking" | "offline" | "weak" | "fair" | "strong";

type ConnectionSnapshot = {
  latency: number | null;
  level: ConnectionLevel;
};

type ConnectionIndicatorProps = {
  language: LocaleCode;
};

const CHECK_INTERVAL = 12_000;
const CHECK_TIMEOUT = 6_000;

const connectionText = {
  en: {
    label: "Signal",
    status: {
      checking: "Checking",
      offline: "Offline",
      weak: "Weak",
      fair: "Fair",
      strong: "Strong"
    }
  },
  id: {
    label: "Sinyal",
    status: {
      checking: "Mengecek",
      offline: "Offline",
      weak: "Lemah",
      fair: "Sedang",
      strong: "Kuat"
    }
  }
} as const;

const classifyLatency = (latency: number): ConnectionLevel => {
  if (latency <= 250) {
    return "strong";
  }

  if (latency <= 700) {
    return "fair";
  }

  return "weak";
};

const getCheckUrl = () => {
  const url = new URL(window.location.href);

  url.hash = "";
  url.searchParams.set("connection-check", String(Date.now()));

  return url.toString();
};

const measureLatency = async () => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CHECK_TIMEOUT);
  const startedAt = performance.now();

  try {
    await fetch(getCheckUrl(), {
      cache: "no-store",
      method: "HEAD",
      signal: controller.signal
    });

    return Math.round(performance.now() - startedAt);
  } finally {
    window.clearTimeout(timeout);
  }
};

export function ConnectionIndicator({ language }: ConnectionIndicatorProps) {
  const text = connectionText[language];
  const [connection, setConnection] = useState<ConnectionSnapshot>({
    latency: null,
    level: "checking"
  });

  useEffect(() => {
    let disposed = false;

    const runConnectionCheck = async () => {
      if (!navigator.onLine) {
        setConnection({ latency: null, level: "offline" });
        return;
      }

      try {
        const latency = await measureLatency();

        if (!disposed) {
          setConnection({
            latency,
            level: classifyLatency(latency)
          });
        }
      } catch {
        if (!disposed) {
          setConnection({
            latency: null,
            level: navigator.onLine ? "weak" : "offline"
          });
        }
      }
    };

    const handleOnline = () => {
      setConnection({ latency: null, level: "checking" });
      void runConnectionCheck();
    };

    const handleOffline = () => {
      setConnection({ latency: null, level: "offline" });
    };

    void runConnectionCheck();

    const interval = window.setInterval(runConnectionCheck, CHECK_INTERVAL);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      disposed = true;
      window.clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const statusLabel = text.status[connection.level];
  const latencyLabel = useMemo(() => {
    if (typeof connection.latency !== "number") {
      return "";
    }

    return ` (${connection.latency}ms)`;
  }, [connection.latency]);

  return (
    <motion.div
      className={clsx("connection-indicator", `connection-indicator-${connection.level}`)}
      data-signal-level={connection.level}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, x: -12, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <span className="connection-indicator-dot" aria-hidden="true" />
      <span>
        {text.label}: {statusLabel}
        {latencyLabel}
      </span>
    </motion.div>
  );
}
