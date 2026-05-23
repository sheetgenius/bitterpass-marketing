import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

interface HealthPayload {
  readonly ok: true;
  readonly status: "ok";
  readonly service: "bitterpass.com";
  readonly hostname: "bitterpass.com";
  readonly git_sha: string;
  readonly release: string;
  readonly secret_material_returned: false;
}

function gitSha(): string {
  const envSha =
    process.env.BITTERPASS_MARKETING_RELEASE_SHA ||
    process.env.RADICCHIO_RELEASE_SHA ||
    process.env.GIT_SHA;

  if (envSha && /^[0-9a-f]{40}$/i.test(envSha)) return envSha.toLowerCase();

  return execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

export function buildHealthPayload(sha = gitSha()): HealthPayload {
  return {
    ok: true,
    status: "ok",
    service: "bitterpass.com",
    hostname: "bitterpass.com",
    git_sha: sha,
    release: sha,
    secret_material_returned: false,
  };
}

export function writeHealthFile(path = "public/up/index.html"): HealthPayload {
  const payload = buildHealthPayload();
  const output = resolve(path);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(payload)}\n`);
  return payload;
}

if (import.meta.main) {
  const outputPath =
    process.argv[2] ||
    process.env.BITTERPASS_MARKETING_HEALTH_PATH ||
    "public/up/index.html";
  const payload = writeHealthFile(outputPath);
  console.log(
    JSON.stringify({
      wrote: outputPath,
      git_sha: payload.git_sha,
      secret_material_returned: false,
    }),
  );
}
