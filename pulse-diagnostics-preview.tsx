"use client";

// Owner-approved public sanitized adaptation of Pulse's diagnostics UI.
// Keeps the reveal/clear/status interaction; removes all private data,
// session/schema details, downloads and proprietary import logic.
// Synthetic event count only. AI-assisted project and excerpt preparation.
import { useState } from "react";

type Props = {
  eventCount: number | null;
  truncated: boolean;
  onClear: () => void;
};

export function DiagnosticsPreview({ eventCount, truncated, onClear }: Props) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  if (eventCount === null) return null;

  return (
    <section aria-label="Import diagnostics" className="min-w-0 rounded-xl border p-3">
      <strong>Device-local import diagnostics</strong>
      <div className="flex flex-wrap gap-2 py-2">
        <button type="button" aria-expanded={visible} onClick={() => setVisible(!visible)}>
          {visible ? "Hide diagnostics" : "Show diagnostics"}
        </button>
        <button type="button" onClick={() => {
          onClear();
          setMessage("Captured diagnostics cleared. New import activity will be captured.");
        }}>
          Clear diagnostics
        </button>
      </div>
      {message && <p role="status">{message}</p>}
      {truncated && <p role="status">Capture limit reached. This record is incomplete.</p>}
      {visible && <p>Captured events: {eventCount}</p>}
    </section>
  );
}
