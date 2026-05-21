"use client";

import { useEffect } from "react";

const blockedShortcutKeys = new Set(["c", "i", "j"]);

function isInspectShortcut(event: KeyboardEvent) {
  const key = event.key.toLowerCase();

  return (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && blockedShortcutKeys.has(key)) ||
    (event.metaKey && event.altKey && blockedShortcutKeys.has(key)) ||
    (event.ctrlKey && key === "u") ||
    (event.metaKey && key === "u")
  );
}

export function ClientProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventInspectShortcuts = (event: KeyboardEvent) => {
      if (!isInspectShortcut(event)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("keydown", preventInspectShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("keydown", preventInspectShortcuts, true);
    };
  }, []);

  return null;
}
