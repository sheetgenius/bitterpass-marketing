import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";

const expectedHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
} as const;

function parseRootHeaders(source: string) {
  const headers = new Map<string, string>();
  let inRootRule = false;

  for (const line of source.split(/\r?\n/)) {
    if (line.trim() === "/*") {
      inRootRule = true;
      continue;
    }

    if (!inRootRule) continue;
    if (line && !line.startsWith(" ") && !line.startsWith("\t")) break;

    const match = line.trim().match(/^([^:]+):\s*(.+)$/);
    if (match) headers.set(match[1], match[2]);
  }

  return headers;
}

describe("BitterPass marketing static security headers", () => {
  test("mirrors the current Radicchio edge baseline", () => {
    const headers = parseRootHeaders(readFileSync("public/_headers", "utf8"));

    for (const [name, value] of Object.entries(expectedHeaders)) {
      expect(headers.get(name)).toBe(value);
    }
  });
});
