import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";

const expectedHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://bitter.sh https://app.bitterpass.com https://bitterdesk.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://app.bitterpass.com https://bitter.sh https://bitterdesk.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=(), browsing-topics=()",
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
  test("declares the public browser hardening baseline", () => {
    const headers = parseRootHeaders(readFileSync("public/_headers", "utf8"));

    for (const [name, value] of Object.entries(expectedHeaders)) {
      expect(headers.get(name)).toBe(value);
    }
  });
});
